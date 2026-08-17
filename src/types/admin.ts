export interface AdminUser {
  id: number
  name: string
  email: string
  role: string
}

export interface AdminLoginResponse {
  success: boolean
  message: string
  token?: string
  admin?: AdminUser
  errors?: Record<string, string[]>
}

export interface AdminMeResponse {
  success: boolean
  admin?: AdminUser
  message?: string
}

export interface AdminLogoutResponse {
  success: boolean
  message: string
}
