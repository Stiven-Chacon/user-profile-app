"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { apiService, type UserProfile } from "../services/api"

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user
    
  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiService.login({ username, password })

      localStorage.setItem("access_token", response.access)
      localStorage.setItem("refresh_token", response.refresh)

      const profile = await apiService.getProfile()
      setUser(profile)

      setIsLoading(false)
      return { success: true }
    } catch (error) {
      setIsLoading(false)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al iniciar sesión",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    setUser(null)
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
