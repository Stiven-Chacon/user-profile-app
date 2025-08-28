"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  Crown,
  Edit3,
  FileText,
  Github,
  Globe,
  Linkedin,
  LogOut,
  Mail,
  Twitter,
  User,
  XCircle,
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

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  const getInitials = (nombre?: string, apellido?: string) => {
    const first = nombre?.charAt(0) || "?"
    const last = apellido?.charAt(0) || "?"
    return `${first}${last}`.toUpperCase()
  }


  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      case "sitio_web":
        return <Globe className="h-4 w-4" />
      default:
        return null
    }
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-1 shadow-lg">
                    <div className="h-full w-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                      {user.basic_info.foto ? (
                        <img
                          src={user.basic_info.foto || "/placeholder.svg"}
                          alt={`${user.basic_info.first_name} ${user.basic_info.last_name}`}
                          className="h-full w-full object-cover rounded-2xl"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-emerald-600">
                          {getInitials(user.basic_info.first_name, user.basic_info.last_name)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name and Type */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-xl font-bold text-slate-800">
                      {user.basic_info.first_name} {user.basic_info.last_name}
                    </h2>
                    {user.esta_verificado ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  {user.tipo_usuario && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      <Crown className="h-3 w-3" />
                      {user.tipo_usuario}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-xl">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.basic_info.email}</span>
                </div>
              </div>
            </div>



          </div>

          <div className="md:col-span-2 space-y-6">
            {/* Biography Card */}
            {user.basic_info.biografia && (
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-800">Biografía</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{user.basic_info.biografia}</p>
              </div>
            )}

            {/* Personal Information Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800">Información Personal</h3>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <label className="text-sm font-medium text-slate-600">Nombre</label>
                    <p className="text-slate-800 font-semibold">{user.basic_info.first_name}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <label className="text-sm font-medium text-slate-600">Apellido</label>
                    <p className="text-slate-800 font-semibold">{user.basic_info.last_name}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <label className="text-sm font-medium text-slate-600">Correo Electrónico</label>
                  <p className="text-slate-800 font-semibold">{user.basic_info.email}</p>
                </div>
                {user.tipo_usuario && (
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <label className="text-sm font-medium text-slate-600">Tipo de Usuario</label>
                    <p className="text-slate-800 font-semibold">{user.tipo_usuario}</p>
                  </div>
                )}
                <div className="bg-slate-50 p-4 rounded-xl">
                  <label className="text-sm font-medium text-slate-600">Estado de Verificación</label>
                  <div className="flex items-center gap-2 mt-1">
                    {user.esta_verificado ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-600 font-semibold">Verificado</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-semibold">No Verificado</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Networks Card */}
            {user.basic_info.redes_sociales && Object.keys(user.basic_info.redes_sociales).length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Redes Sociales</h3>
                <div className="space-y-3">
                  {Object.entries(user.basic_info.redes_sociales).map(([platform, handle]) => {
                    if (!handle) return null
                    return (
                      <div key={platform} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg">
                          {getSocialIcon(platform)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-600 capitalize">{platform}</p>
                          <p className="text-slate-800 font-semibold">{handle}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Educación Card */}
            {user.educacion && user.educacion.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Educación</h3>
                <div className="space-y-4">
                  {user.educacion.map((edu) => (
                    <div key={edu.id} className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-slate-800 font-semibold">{edu.titulo}</p>
                      <p className="text-sm text-slate-600">{edu.institucion}</p>
                      <p className="text-xs text-slate-500">
                        {edu.fecha_inicio} - {edu.fecha_fin ?? "Presente"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experiencia Laboral Card */}
            {user.experiencia_laboral && user.experiencia_laboral.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Experiencia Laboral</h3>
                <div className="space-y-4">
                  {user.experiencia_laboral.map((exp) => (
                    <div key={exp.id} className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-slate-800 font-semibold">{exp.posicion}</p>
                      <p className="text-sm text-slate-600">{exp.empresa}</p>
                      <p className="text-xs text-slate-500">
                        {exp.fecha_inicio} - {exp.actualmente ? "Actualidad" : exp.fecha_fin}
                      </p>
                      <p className="text-sm text-slate-700 mt-2">{exp.funciones}</p>
                      {exp.habilidades && exp.habilidades.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {exp.habilidades.map((h) => (
                            <span
                              key={h.id}
                              className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full"
                            >
                              {h.nombre}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades Card */}
            {user.habilidades && user.habilidades.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Habilidades</h3>
                <div className="flex flex-wrap gap-3">
                  {user.habilidades.map((skill) => (
                    <div
                      key={skill.id}
                      className="px-4 py-2 bg-emerald-50 text-emerald-700 font-medium rounded-xl shadow-sm"
                    >
                      {skill.habilidad__nombre} ({skill.tiempo_experiencia} años)
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portafolio Card */}
            {user.portafolio && user.portafolio.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Portafolio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.portafolio.map((item) => (
                    <div key={item.id} className="bg-slate-50 p-4 rounded-xl shadow-sm">
                      <p className="text-slate-800 font-semibold">{item.titulo}</p>
                      <p className="text-sm text-slate-600">{item.descripcion}</p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 text-sm mt-2 inline-block"
                        >
                          Ver Proyecto
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>
      </main>

    </div>
  )
}
