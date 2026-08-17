import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"
import type { AdminUser } from "../types/admin"
import { adminLoginApi, adminMeApi, adminLogoutApi } from "../services/adminApi"

const TOKEN_STORAGE_KEY = "robiair_admin_token"

interface AuthContextType {
  admin: AdminUser | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean message?: string }>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  )
  const [loading, setLoading] = useState<boolean>(true)

  const clearAuthState = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken(null)
    setAdmin(null)
  }, [])

  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!storedToken) {
      setAdmin(null)
      setToken(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const response = await adminMeApi(storedToken)

    if (response.success && response.admin && response.admin.role === "admin") {
      setAdmin(response.admin)
      setToken(storedToken)
    } else {
      clearAuthState()
    }

    setLoading(false)
  }, [clearAuthState])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, password: string) => {
    setLoading(true)
    const response = await adminLoginApi(email, password)

    if (
      response.success &&
      response.token &&
      response.admin &&
      response.admin.role === "admin"
    ) {
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token)
      setToken(response.token)
      setAdmin(response.admin)
      setLoading(false)
      return { success: true, message: response.message }
    } else {
      clearAuthState()
      setLoading(false)
      return {
        success: false,
        message: response.message || "Login failed. Please check credentials.",
      }
    }
  }

  const logout = async () => {
    if (token) {
      await adminLogoutApi(token)
    }
    clearAuthState()
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!admin && admin.role === "admin",
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
