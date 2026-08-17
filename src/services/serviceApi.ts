import { API_BASE_URL } from "../config/api"

export interface ServiceItem {
  id: number
  title: string
  slug?: string
  short_description?: string | null
  image: string
  image_url: string
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface ServiceResponse {
  success: boolean
  message?: string
  data?: ServiceItem | ServiceItem[]
  errors?: Record<string, string[]>
}

/**
 * Fetch active services for the public homepage (Public).
 */
export async function getPublicServicesApi(): Promise<ServiceResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/services`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to fetch public services.",
    }
  }
}

/**
 * Fetch list of all services (Admin).
 */
export async function getServicesApi(token: string): Promise<ServiceResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/services`, {
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
      message: "Network error. Unable to fetch services.",
    }
  }
}

/**
 * Create a new service with image upload (Admin).
 */
export async function createServiceApi(
  token: string,
  formData: FormData,
): Promise<ServiceResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/services`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to create service.",
    }
  }
}

/**
 * Update an existing service (Admin).
 */
export async function updateServiceApi(
  token: string,
  id: number,
  formData: FormData,
): Promise<ServiceResponse> {
  try {
    if (!formData.has("_method")) {
      formData.append("_method", "PUT")
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/services/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to update service.",
    }
  }
}

/**
 * Delete a service and its image file (Admin).
 */
export async function deleteServiceApi(
  token: string,
  id: number,
): Promise<ServiceResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/services/${id}`, {
      method: "DELETE",
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
      message: "Network error. Unable to delete service.",
    }
  }
}
