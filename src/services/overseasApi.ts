import { API_BASE_URL } from "../config/api"

export interface OverseasServiceItem {
  id: number
  title: string
  country?: string | null
  slug?: string
  description?: string | null
  image: string
  image_url: string
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface OverseasServiceResponse {
  success: boolean
  message?: string
  data?: OverseasServiceItem | OverseasServiceItem[]
  errors?: Record<string, string[]>
}

/**
 * Fetch active overseas services for the public website.
 */
export async function getPublicOverseasServicesApi(): Promise<OverseasServiceResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/overseas-services`, {
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
      message: "Network error. Unable to fetch overseas services.",
    }
  }
}

/**
 * Fetch list of all overseas services (Admin).
 */
export async function getOverseasServicesApi(
  token: string,
): Promise<OverseasServiceResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/overseas-services`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to fetch overseas services.",
    }
  }
}

/**
 * Create a new overseas service with image upload (Admin).
 */
export async function createOverseasServiceApi(
  token: string,
  formData: FormData,
): Promise<OverseasServiceResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/overseas-services`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to create overseas service.",
    }
  }
}

/**
 * Update an existing overseas service (Admin).
 */
export async function updateOverseasServiceApi(
  token: string,
  id: number,
  formData: FormData,
): Promise<OverseasServiceResponse> {
  try {
    if (!formData.has("_method")) {
      formData.append("_method", "PUT")
    }

    const response = await fetch(
      `${API_BASE_URL}/api/admin/overseas-services/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to update overseas service.",
    }
  }
}

/**
 * Delete an overseas service and its image file (Admin).
 */
export async function deleteOverseasServiceApi(
  token: string,
  id: number,
): Promise<OverseasServiceResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/overseas-services/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to delete overseas service.",
    }
  }
}
