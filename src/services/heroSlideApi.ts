import { API_BASE_URL } from "../config/api"

export interface HeroSlideItem {
  id: number
  title?: string | null
  subtitle?: string | null
  image: string
  image_url: string
  button_text?: string | null
  button_url?: string | null
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface HeroSlideResponse {
  success: boolean
  message?: string
  data?: HeroSlideItem | HeroSlideItem[]
  errors?: Record<string, string[]>
}

/**
 * Fetch list of all hero slides (Admin).
 */
export async function getHeroSlidesApi(
  token: string,
): Promise<HeroSlideResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/hero-slides`, {
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
      message: "Network error. Unable to fetch hero slides.",
    }
  }
}

/**
 * Create a new hero slide with image upload (Admin).
 */
export async function createHeroSlideApi(
  token: string,
  formData: FormData,
): Promise<HeroSlideResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/hero-slides`, {
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
      message: "Network error. Unable to create hero slide.",
    }
  }
}

/**
 * Update an existing hero slide (Admin).
 */
export async function updateHeroSlideApi(
  token: string,
  id: number,
  formData: FormData,
): Promise<HeroSlideResponse> {
  try {
    // Append _method PUT for Laravel multipart form handling
    if (!formData.has("_method")) {
      formData.append("_method", "PUT")
    }

    const response = await fetch(
      `${API_BASE_URL}/api/admin/hero-slides/${id}`,
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
      message: "Network error. Unable to update hero slide.",
    }
  }
}

/**
 * Delete a hero slide and its image file (Admin).
 */
export async function deleteHeroSlideApi(
  token: string,
  id: number,
): Promise<HeroSlideResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/hero-slides/${id}`,
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
      message: "Network error. Unable to delete hero slide.",
    }
  }
}
