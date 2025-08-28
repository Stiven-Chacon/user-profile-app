"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { apiService } from "../services/api"
import { mockUser, UserProfile } from "../lib/mock-data"

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (userData: Partial<UserProfile>) => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(mockUser)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user
  
   useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token")
      if (token) {
        try {
          const profile = await apiService.getProfile()
          setUser(profile)
        } catch (error) {
          console.error("Error loading profile:", error)
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, []) 
  
  
  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiService.login({ username, password })
      
      localStorage.setItem("access_token", response.data.access)
      localStorage.setItem("refresh_token", response.data.refresh)

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

  const updateUser = (userData: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

   const refreshProfile = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          setUser({ ...user })
        }
        resolve()
      }, 300)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        refreshProfile,
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
