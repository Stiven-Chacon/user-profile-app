"use client";
import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              Bienvenido
            </h1>
            <p className="text-slate-600 mt-2">Inicia sesión en tu cuenta para continuar</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-8">
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-center text-emerald-700">Iniciar Sesión</h2>
            <p className="text-center text-slate-600 text-sm">Ingresa tus credenciales para acceder</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Correo Electrónico
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            
            >
              Iniciar Sesión
            </button> 
          </form>

          <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-sm text-emerald-700 text-center mb-3 font-semibold">Credenciales de prueba:</p>
            <div className="text-sm text-center space-y-2">
              <div className="bg-white px-3 py-2 rounded-lg border border-emerald-200">
                <p className="font-mono text-slate-700">ana.garcia@email.com</p>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg border border-emerald-200">
                <p className="font-mono text-slate-700">123456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
