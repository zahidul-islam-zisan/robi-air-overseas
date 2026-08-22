import { API_BASE_URL } from "../config/api"

export interface GalleryItem {
  id: number
  title?: string | null
  category?: string | null
  image: string
  image_url: string
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface GalleryResponse {
  success: boolean
  message?: string
  data?: GalleryItem | GalleryItem[]
  errors?: Record<string, string[]>
}

/**
 * Fetch active gallery items for the public website.
 */
export async function getPublicGalleryApi(): Promise<GalleryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/gallery`, {
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
      message: "Network error. Unable to fetch gallery.",
    }
  }
}

/**
 * Fetch list of all gallery items (Admin).
 */
export async function getGalleryApi(token: string): Promise<GalleryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/gallery`, {
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
      message: "Network error. Unable to fetch gallery.",
    }
  }
}

/**
 * Create a new gallery item with image upload (Admin).
 */
export async function createGalleryApi(
  token: string,
  formData: FormData,
): Promise<GalleryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/gallery`, {
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
      message: "Network error. Unable to upload gallery image.",
    }
  }
}

/**
 * Update an existing gallery item (Admin).
 */
export async function updateGalleryApi(
  token: string,
  id: number,
  formData: FormData,
): Promise<GalleryResponse> {
  try {
    if (!formData.has("_method")) {
      formData.append("_method", "PUT")
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/gallery/${id}`, {
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
      message: "Network error. Unable to update gallery item.",
    }
  }
}

/**
 * Delete a gallery item and its image file (Admin).
 */
export async function deleteGalleryApi(
  token: string,
  id: number,
): Promise<GalleryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/gallery/${id}`, {
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
      message: "Network error. Unable to delete gallery item.",
    }
  }
}
