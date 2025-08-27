"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Edit3,
  LogOut,
} from "lucide-react"
import { useAuth } from "../hooks/use-auth"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {    
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [mounted, isLoading, isAuthenticated, router])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="text-slate-600">Cargando perfil...</p>
        </div>
      </div>
    )
  } 


  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              Mi Perfil
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              <Edit3 className="h-4 w-4" />
              Editar
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-700 hover:text-red-600 font-semibold rounded-xl transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

    
    </div>
  )
}
