import { API_BASE_URL } from "../config/api"

export interface TestimonialItem {
  id: number
  customer_name: string
  customer_role?: string | null
  message: string
  image?: string | null
  image_url?: string | null
  rating: number
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface TestimonialResponse {
  success: boolean
  message?: string
  data?: TestimonialItem | TestimonialItem[]
  errors?: Record<string, string[]>
}

/**
 * Fetch active testimonials for the public website.
 */
export async function getPublicTestimonialsApi(): Promise<TestimonialResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/testimonials`, {
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
      message: "Network error. Unable to fetch testimonials.",
    }
  }
}

/**
 * Fetch list of all testimonials (Admin).
 */
export async function getTestimonialsApi(
  token: string,
): Promise<TestimonialResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/testimonials`, {
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
      message: "Network error. Unable to fetch testimonials.",
    }
  }
}

/**
 * Create a new testimonial (Admin).
 */
export async function createTestimonialApi(
  token: string,
  formData: FormData,
): Promise<TestimonialResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/testimonials`, {
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
      message: "Network error. Unable to create testimonial.",
    }
  }
}

/**
 * Update an existing testimonial (Admin).
 */
export async function updateTestimonialApi(
  token: string,
  id: number,
  formData: FormData,
): Promise<TestimonialResponse> {
  try {
    if (!formData.has("_method")) {
      formData.append("_method", "PUT")
    }

    const response = await fetch(
      `${API_BASE_URL}/api/admin/testimonials/${id}`,
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
      message: "Network error. Unable to update testimonial.",
    }
  }
}

/**
 * Delete a testimonial (Admin).
 */
export async function deleteTestimonialApi(
  token: string,
  id: number,
): Promise<TestimonialResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/testimonials/${id}`,
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
      message: "Network error. Unable to delete testimonial.",
    }
  }
}
