"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { apiService } from "../services/api"

interface AuthContextType {
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)


  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiService.login({ username, password })

      localStorage.setItem("access_token", response.access)
      localStorage.setItem("refresh_token", response.refresh)

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

  

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        login,
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
