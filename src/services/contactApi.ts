import { API_BASE_URL } from "../config/api"

export interface ContactMessageItem {
  id: number
  name: string
  phone: string
  email?: string | null
  subject?: string | null
  message: string
  status: string
  created_at?: string
  updated_at?: string
}

export interface ContactMessageResponse {
  success: boolean
  message?: string
  data?: ContactMessageItem | ContactMessageItem[]
  errors?: Record<string, string[]>
}

/**
 * Submit contact message from public website.
 */
export async function submitContactMessageApi(payload: {
  name: string
  phone: string
  email?: string
  subject?: string
  message: string
}): Promise<ContactMessageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to send contact message.",
    }
  }
}

/**
 * Fetch all contact messages (Admin).
 */
export async function getContactMessagesApi(
  token: string,
): Promise<ContactMessageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/contact-messages`, {
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
      message: "Network error. Unable to fetch contact messages.",
    }
  }
}

/**
 * Mark contact message as read (Admin).
 */
export async function markContactMessageReadApi(
  token: string,
  id: number,
  status = "read",
): Promise<ContactMessageResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/contact-messages/${id}/read`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: "Network error. Unable to update status.",
    }
  }
}

/**
 * Delete contact message (Admin).
 */
export async function deleteContactMessageApi(
  token: string,
  id: number,
): Promise<ContactMessageResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/contact-messages/${id}`,
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
      message: "Network error. Unable to delete contact message.",
    }
  }
}
