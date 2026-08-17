import { API_BASE_URL } from "../config/api"
import type {
  AdminLoginResponse,
  AdminMeResponse,
  AdminLogoutResponse,
} from "../types/admin"

/**
 * Authenticate admin with email and password.
 */
export async function adminLoginApi(
  email: string,
  password: string,
): Promise<AdminLoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to connect to backend server.",
    }
  }
}

/**
 * Fetch current authenticated admin user profile.
 */
export async function adminMeApi(token: string): Promise<AdminMeResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to verify admin session.",
    }
  }
}

/**
 * Revoke current Sanctum token to logout admin.
 */
export async function adminLogoutApi(
  token: string,
): Promise<AdminLogoutResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error during logout.",
    }
  }
}
