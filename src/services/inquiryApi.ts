import { API_BASE_URL } from "../config/api"
import type { PackageItem } from "./packageApi"

export interface BookingInquiryItem {
  id: number
  name: string
  phone: string
  email?: string | null
  package_id?: number | null
  travel_date?: string | null
  number_of_people?: number
  message?: string | null
  status: "pending" | "contacted" | "confirmed" | "cancelled"
  package?: PackageItem | null
  created_at?: string
  updated_at?: string
}

export interface BookingInquiryResponse {
  success: boolean
  message?: string
  data?: BookingInquiryItem | BookingInquiryItem[]
  errors?: Record<string, string[]>
}

/**
 * Submit booking inquiry from public website.
 */
export async function submitBookingInquiryApi(payload: {
  name: string
  phone: string
  email?: string
  package_id?: number
  travel_date?: string
  number_of_people?: number
  message?: string
}): Promise<BookingInquiryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/booking-inquiries`, {
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
      message: "Network error. Unable to submit booking inquiry.",
    }
  }
}

/**
 * Fetch all booking inquiries (Admin).
 */
export async function getBookingInquiriesApi(
  token: string,
): Promise<BookingInquiryResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/booking-inquiries`,
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
      message: "Network error. Unable to fetch booking inquiries.",
    }
  }
}

/**
 * Update status of booking inquiry (Admin).
 */
export async function updateInquiryStatusApi(
  token: string,
  id: number,
  status: "pending" | "contacted" | "confirmed" | "cancelled",
): Promise<BookingInquiryResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/booking-inquiries/${id}/status`,
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
 * Delete booking inquiry (Admin).
 */
export async function deleteBookingInquiryApi(
  token: string,
  id: number,
): Promise<BookingInquiryResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/booking-inquiries/${id}`,
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
      message: "Network error. Unable to delete booking inquiry.",
    }
  }
}
