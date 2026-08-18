import { API_BASE_URL } from "../config/api"

export interface PackageCategoryItem {
  id: number
  name: string
  slug: string
}

export interface PackageItem {
  id: number
  package_category_id: number
  title: string
  slug?: string
  short_description?: string | null
  price?: string | null
  duration?: string | null
  image: string
  image_url: string
  display_order: number
  is_active: boolean
  category?: PackageCategoryItem
  created_at?: string
  updated_at?: string
}

export interface PackageCategoryResponse {
  success: boolean
  message?: string
  data?: PackageCategoryItem[]
}

export interface PackageResponse {
  success: boolean
  message?: string
  data?: PackageItem | PackageItem[]
  errors?: Record<string, string[]>
}

/**
 * Fetch list of all active package categories (Admin).
 */
export async function getPackageCategoriesApi(
  token: string,
): Promise<PackageCategoryResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/package-categories`,
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
      message: "Network error. Unable to fetch package categories.",
    }
  }
}

/**
 * Fetch list of all packages (Admin).
 */
export async function getPackagesApi(token: string): Promise<PackageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/packages`, {
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
      message: "Network error. Unable to fetch packages.",
    }
  }
}

/**
 * Create a new package with image upload (Admin).
 */
export async function createPackageApi(
  token: string,
  formData: FormData,
): Promise<PackageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/packages`, {
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
      message: "Network error. Unable to create package.",
    }
  }
}

/**
 * Update an existing package (Admin).
 */
export async function updatePackageApi(
  token: string,
  id: number,
  formData: FormData,
): Promise<PackageResponse> {
  try {
    if (!formData.has("_method")) {
      formData.append("_method", "PUT")
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/packages/${id}`, {
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
      message: "Network error. Unable to update package.",
    }
  }
}

/**
 * Delete a package and its image file (Admin).
 */
export async function deletePackageApi(
  token: string,
  id: number,
): Promise<PackageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/packages/${id}`, {
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
      message: "Network error. Unable to delete package.",
    }
  }
}
