import { UserProfile } from "../lib/mock-data"

const API_BASE_URL = "http://46.202.88.87:8010/usuarios/api"

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  data: {
    access: string
    refresh: string
  }
}

export interface UpdateProfileRequest {
  nombre?: string
  apellido?: string
  biografia?: string
  telefono?: string
  fecha_nacimiento?: string
  genero?: string
  pais?: string
  ciudad?: string
  direccion?: string
  sitio_web?: string
  linkedin?: string
  twitter?: string
  instagram?: string
  facebook?: string
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("access_token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
    return this.handleResponse<LoginResponse>(response)
  }

    async getProfile(): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/perfil/`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    })    
    const result = await this.handleResponse<{ data: UserProfile }>(response)
    return result.data
  }

  async updateProfile(profileData: UpdateProfileRequest): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/usuario/perfil/`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    })
    return this.handleResponse<UserProfile>(response)
  }

  async updateProfilePhoto(photoFile: File): Promise<UserProfile> {
    const formData = new FormData()
    formData.append("foto", photoFile)

    const token = localStorage.getItem("access_token")
    const response = await fetch(`${API_BASE_URL}/perfil/foto/`, {
      method: "PATCH",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })
    return this.handleResponse<UserProfile>(response)
  }
  

}

export const apiService = new ApiService()
