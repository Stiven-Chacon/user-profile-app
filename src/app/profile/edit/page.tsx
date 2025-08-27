"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, User, FileText, Users, Camera, AlertCircle, Shield } from "lucide-react"
import { useAuth } from "@/app/hooks/use-auth"
import { apiService } from "@/app/services/api"

interface FormData {
    first_name: string
    last_name: string
    correo: string
    biografia: string
    telefono: string
    tipo_usuario: string
    tipo_naturaleza: string
    documento: string
    esta_verificado: string
    sitio_web: string
    linkedin: string
    twitter: string
    github: string

}

export default function EditProfilePage() {
    const { user, isAuthenticated, isLoading, refreshProfile } = useAuth()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        first_name: "",
        last_name: "",
        correo: "",
        biografia: "",
        telefono: "",
        tipo_usuario: "",
        tipo_naturaleza: "",
        documento: "",
        esta_verificado: "",
        sitio_web: "",
        linkedin: "",
        twitter: "",
        github: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && !isLoading && !isAuthenticated) {
            router.push("/")
        }
    }, [mounted, isLoading, isAuthenticated, router])

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.user.first_name || "",
                last_name: user.user.last_name || "",
                correo: user.correo || "",
                biografia: user.biografia || "",
                telefono: user.telefono || "",
                tipo_usuario: user.tipo_usuario || "",
                tipo_naturaleza: user.tipo_naturaleza || "",
                documento: user.documento || "",
                esta_verificado: formData.esta_verificado ? "true" : "false",
                sitio_web: user.redesSociales.sitio_web || "",
                linkedin: user.redesSociales.linkedin || "",
                twitter: user.redesSociales.twitter || "",
                github: user.redesSociales.github || "",
            })
        }
    }, [user])


 if (!mounted || isLoading) {
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Cargando...</p>
            </div>
          </div>
        )
      } 

    if (!user) {
        return null
    }

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }


    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPhotoFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handlePhotoUpload = async () => {
        if (!photoFile) return

        setIsUploadingPhoto(true)
        try {
            await apiService.updateProfilePhoto(photoFile)
            await refreshProfile()
            setMessage({ type: "success", text: "Foto actualizada exitosamente" })
            setPhotoFile(null)
            setPhotoPreview(null)
        } catch (error) {
            setMessage({
                type: "error",
                text: error instanceof Error ? error.message : "Error al subir la foto",
            })
        }
        setIsUploadingPhoto(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage(null)

        try {
            await apiService.updateProfile(formData)
            await refreshProfile()
            setMessage({ type: "success", text: "Perfil actualizado exitosamente" })
            setTimeout(() => {
                router.push("/profile")
            }, 2000)
        } catch (error) {
            setMessage({
                type: "error",
                text: error instanceof Error ? error.message : "Error al actualizar el perfil",
            })
        }
        setIsSubmitting(false)
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => router.push("/profile")}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </button>

                    </div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                            Editar Perfil
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Photo Upload Section */}
                    <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                                <Camera className="h-5 w-5" />
                                Foto de Perfil
                            </h2>
                        </div>
                        <hr className="border-t-1 border-b-black" />
                        <div className="p-6">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-primary/20">
                                        <img
                                            src={photoPreview || user.foto || "/placeholder.svg?height=80&width=80"}
                                            alt={`${user.user.first_name} ${user.user.last_name}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:font-semibold file:bg-gradient-to-r file:from-emerald-500 file:to-emerald-600 file:text-white
                                        hover:file:from-emerald-600 hover:file:to-emerald-700 transition-all duration-200 file:shadow-lg cursor-pointer"
                                    />
                                    {photoFile && (
                                        <button
                                            type="button"
                                            onClick={handlePhotoUpload}
                                            disabled={isUploadingPhoto}
                                            className="flex items-center gap-2 px-5 py-2.5 
                                            border border-gray-300 text-gray-700 
                                            bg-white rounded-xl font-medium 
                                            hover:bg-gray-100 hover:border-gray-400 
                                            disabled:opacity-50 disabled:cursor-not-allowed 
                                            transition-all duration-200 shadow-sm"
                                        >
                                            <Upload className="h-4 w-4 text-gray-500" />
                                            {isUploadingPhoto ? "Subiendo..." : "Subir Foto"}
                                        </button>

                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Información Personal
                            </h2>
                        </div>
                        <hr className="border-t-1 border-black" />
                        <div className="p-6 space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="nombre" className="text-sm font-medium text-black">
                                        Nombre
                                    </label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        value={formData.first_name}
                                        onChange={(e) => handleInputChange("first_name", e.target.value)}
                                        className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-black"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="apellido" className="text-sm font-medium text-black">
                                        Apellido
                                    </label>
                                    <input
                                        id="apellido"
                                        type="text"
                                        value={formData.last_name}
                                        onChange={(e) => handleInputChange("last_name", e.target.value)}
                                        className=" text-black w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-black">
                                    Correo Electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.correo}
                                    onChange={(e) => handleInputChange("correo", e.target.value)}
                                    className="text-black w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="telefono" className="text-sm font-medium text-black">
                                        Teléfono
                                    </label>
                                    <input
                                        id="telefono"
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={(e) => handleInputChange("telefono", e.target.value)}
                                        className="text-black w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                    />
                                </div>
                            </div>
                            {/* Verificación */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-black flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Estado de Verificación
                                </label>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="verificado"
                                            checked={formData.esta_verificado === "true"}
                                            onChange={() => handleInputChange("esta_verificado", true)}
                                            className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-ring"
                                        />
                                        <span className="text-sm text-black">Verificado</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="verificado"
                                            checked={formData.esta_verificado === "false"}
                                            onChange={() => handleInputChange("esta_verificado", false)}
                                            className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-ring"
                                        />
                                        <span className="text-sm text-black">No Verificado</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Biography */}
                    <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Biografía
                            </h2>
                        </div>
                        <hr className="border-t-1 border-black" />
                        <div className="p-6">
                            <div className="space-y-2">
                                <label htmlFor="biografia" className="text-sm font-medium text-black">
                                    Cuéntanos sobre ti
                                </label>
                                <textarea
                                    id="biografia"
                                    value={formData.biografia}
                                    onChange={(e) => handleInputChange("biografia", e.target.value)}
                                    placeholder="Escribe una breve descripción sobre ti..."
                                    className="text-black w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent min-h-[100px] resize-none"
                                    maxLength={500}
                                />
                                <p className="text-sm text-muted-foreground text-right">{formData.biografia.length}/500 caracteres</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Networks */}
                    <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-6">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Redes Sociales
                            </h2>
                        </div>
                        <hr className="border-t-1 border-black" />
                        <div className="p-6 space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="linkedin" className="text-sm font-medium text-black">
                                        LinkedIn
                                    </label>
                                    <input
                                        id="linkedin"
                                        type="text"
                                        value={formData.linkedin}
                                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                                        placeholder="usuario-linkedin"
                                        className="text-black w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="twitter" className="text-sm font-medium text-black">
                                        Twitter
                                    </label>
                                    <input
                                        id="twitter"
                                        type="text"
                                        value={formData.twitter}
                                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                                        placeholder="@usuario"
                                        className="text-black w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="github" className="text-sm font-medium text-black">
                                        Github
                                    </label>
                                    <input
                                        id="github"
                                        type="text"
                                        value={formData.github}
                                        onChange={(e) => handleInputChange("github", e.target.value)}
                                        placeholder="@usuario"
                                        className="text-black w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="sitio_web" className="text-sm font-medium text-black">
                                        Sitio Web
                                    </label>
                                    <input
                                        id="sitio_web"
                                        type="text"
                                        value={formData.sitio_web}
                                        onChange={(e) => handleInputChange("sitio_web", e.target.value)}
                                        placeholder="usuario.sitio_web"
                                        className="text-black w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    {message && (
                        <div
                            className={`flex items-center gap-2 p-3 rounded-md ${message.type === "error"
                                ? "bg-red-500/10 border border-red-500/20"
                                : "bg-green-50 border border-green-200"
                                }`}
                        >
                            <AlertCircle className={`h-4 w-4 ${message.type === "error" ? "text-red-500" : "text-green-600"}`} />
                            <p className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-700"}`}>
                                {message.text}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </button>

                    </div>

                </form>
            </main>
        </div>
    )
}
