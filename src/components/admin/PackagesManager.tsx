import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/AuthContext"
import {
  getPackagesApi,
  getPackageCategoriesApi,
  createPackageApi,
  updatePackageApi,
  deletePackageApi,
  type PackageItem,
  type PackageCategoryItem,
} from "../../services/packageApi"

export const PackagesManager: React.FC = () => {
  const { token } = useAuth()

  const [packages, setPackages] = useState<PackageItem[]>([])
  const [categories, setCategories] = useState<PackageCategoryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)

  // Modal / Form state (EXCLUSIVELY 8 CLIENT FIELDS)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null)

  const [packageName, setPackageName] = useState("")
  const [categoryId, setCategoryId] = useState<number | "">("")
  const [shortDescription, setShortDescription] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("")
  const [displayOrder, setDisplayOrder] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formValidationErrors, setFormValidationErrors] =
    useState<Record<string, string[]>>({})

  // Delete modal state
  const [deletingPackage, setDeletingPackage] = useState<PackageItem | null>(
    null,
  )
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setErrorNotice(null)

    const [catRes, pkgRes] = await Promise.all([
      getPackageCategoriesApi(token),
      getPackagesApi(token),
    ])

    if (catRes.success && Array.isArray(catRes.data)) {
      setCategories(catRes.data)
    }

    if (pkgRes.success && Array.isArray(pkgRes.data)) {
      setPackages(pkgRes.data)
    } else {
      setErrorNotice(pkgRes.message || "Unable to load packages.")
    }

    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openAddForm = () => {
    setEditingPackage(null)
    setPackageName("")
    setCategoryId(categories.length > 0 ? categories[0].id : "")
    setShortDescription("")
    setPrice("")
    setDuration("")
    setDisplayOrder(packages.length + 1)
    setIsActive(true)
    setSelectedFile(null)
    setImagePreviewUrl(null)
    setFormValidationErrors({})
    setIsFormOpen(true)
  }

  const openEditForm = (pkg: PackageItem) => {
    setEditingPackage(pkg)
    setPackageName(pkg.title || "")
    setCategoryId(
      pkg.package_category_id ||
        (categories.length > 0 ? categories[0].id : ""),
    )
    setShortDescription(pkg.short_description || "")
    setPrice(pkg.price || "")
    setDuration(pkg.duration || "")
    setDisplayOrder(pkg.display_order ?? 0)
    setIsActive(pkg.is_active ?? true)
    setSelectedFile(null)
    setImagePreviewUrl(pkg.image_url || null)
    setFormValidationErrors({})
    setIsFormOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setImagePreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    setFormValidationErrors({})
    setErrorNotice(null)
    setSuccessNotice(null)

    if (!packageName.trim()) {
      setFormValidationErrors({
        title: ["Package Name is required."],
      })
      return
    }

    if (!categoryId) {
      setFormValidationErrors({
        package_category_id: ["Please select a category."],
      })
      return
    }

    if (!editingPackage && !selectedFile) {
      setFormValidationErrors({
        image: ["Please select an image for the new package."],
      })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", packageName.trim())
    formData.append("package_category_id", String(categoryId))
    if (shortDescription) formData.append("short_description", shortDescription)
    if (price) formData.append("price", price)
    if (duration) formData.append("duration", duration)
    formData.append("display_order", String(displayOrder))
    formData.append("is_active", isActive ? "1" : "0")

    if (selectedFile) {
      formData.append("image", selectedFile)
    }

    let response
    if (editingPackage) {
      response = await updatePackageApi(token, editingPackage.id, formData)
    } else {
      response = await createPackageApi(token, formData)
    }

    if (response.success) {
      setSuccessNotice(
        editingPackage
          ? "Package updated successfully."
          : "Package created successfully.",
      )
      setIsFormOpen(false)
      fetchData()
    } else {
      if (response.errors) {
        setFormValidationErrors(response.errors)
      } else {
        setErrorNotice(response.message || "Unable to save package.")
      }
    }

    setIsSubmitting(false)
  }

  const confirmDelete = async () => {
    if (!token || !deletingPackage) return
    setIsDeleting(true)
    setErrorNotice(null)
    setSuccessNotice(null)

    const response = await deletePackageApi(token, deletingPackage.id)

    if (response.success) {
      setSuccessNotice("Package deleted successfully.")
      setDeletingPackage(null)
      fetchData()
    } else {
      setErrorNotice(response.message || "Unable to delete package.")
    }

    setIsDeleting(false)
  }

  return (
    <div>
      {/* Top Header & Add Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#111827",
              margin: 0,
            }}
          >
            Packages Management
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Manage Hajj, Umrah, Tour & Travel packages with prices, categories
            and images.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          style={{
            background: "linear-gradient(135deg, #00A86B 0%, #053B36 100%)",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: 14,
            padding: "12px 20px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0, 168, 107, 0.3)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          + Add Package
        </button>
      </div>

      {/* Alert Notices */}
      {successNotice && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#065f46",
            padding: "12px 16px",
            borderRadius: 12,
            marginBottom: 20,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ✓ {successNotice}
        </div>
      )}

      {errorNotice && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            padding: "12px 16px",
            borderRadius: 12,
            marginBottom: 20,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ⚠ {errorNotice}
        </div>
      )}

      {/* Management Table */}
      {loading ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            padding: 40,
            textAlign: "center",
            color: "#6b7280",
            fontWeight: 600,
          }}
        >
          Loading packages...
        </div>
      ) : packages.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            padding: 48,
            textAlign: "center",
            border: "1px dashed #d1d5db",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#374151",
              marginBottom: 8,
            }}
          >
            No Packages Found
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
            Click the button below to create your first package.
          </p>
          <button
            type="button"
            onClick={openAddForm}
            style={{
              background: "#00A86B",
              color: "#ffffff",
              fontWeight: 700,
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add Package
          </button>
        </div>
      ) : (
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: 14,
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#374151",
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <th style={{ padding: "16px 20px" }}>Image</th>
                <th style={{ padding: "16px 20px" }}>Package Name</th>
                <th style={{ padding: "16px 20px" }}>Category</th>
                <th style={{ padding: "16px 20px" }}>Price / Duration</th>
                <th style={{ padding: "16px 20px" }}>Status</th>
                <th style={{ padding: "16px 20px" }}>Order</th>
                <th style={{ padding: "16px 20px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr
                  key={pkg.id}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background 0.15s",
                  }}
                >
                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        width: 76,
                        height: 54,
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "#041B18",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <img
                        src={pkg.image_url}
                        alt={pkg.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        fontWeight: 800,
                        color: "#111827",
                        fontSize: 15,
                      }}
                    >
                      {pkg.title}
                    </div>
                    {pkg.short_description && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          marginTop: 4,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {pkg.short_description}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 8,
                        background: "rgba(0, 168, 107, 0.1)",
                        color: "#053B36",
                        border: "1px solid rgba(0, 168, 107, 0.2)",
                      }}
                    >
                      {pkg.category?.name || "General"}
                    </span>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        fontWeight: 800,
                        color: "#00A86B",
                        fontSize: 14,
                      }}
                    >
                      {pkg.price || "—"}
                    </div>
                    {pkg.duration && (
                      <div
                        style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}
                      >
                        ⏱ {pkg.duration}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: pkg.is_active ? "#dcfce7" : "#fee2e2",
                        color: pkg.is_active ? "#15803d" : "#b91c1c",
                      }}
                    >
                      {pkg.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        background: "#f3f4f6",
                        padding: "4px 10px",
                        borderRadius: 8,
                        fontWeight: 800,
                        color: "#374151",
                        fontSize: 13,
                      }}
                    >
                      #{pkg.display_order}
                    </span>
                  </td>

                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 8,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => openEditForm(pkg)}
                        style={{
                          background: "#f3f4f6",
                          color: "#1f2937",
                          border: "1px solid #d1d5db",
                          padding: "6px 14px",
                          borderRadius: 8,
                          fontWeight: 700,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingPackage(pkg)}
                        style={{
                          background: "#fef2f2",
                          color: "#dc2626",
                          border: "1px solid #fca5a5",
                          padding: "6px 14px",
                          borderRadius: 8,
                          fontWeight: 700,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Package Form Modal (EXCLUSIVELY 8 CLIENT FIELDS) */}
      {isFormOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              maxWidth: 540,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 32,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                borderBottom: "1px solid #f3f4f6",
                paddingBottom: 16,
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#111827",
                  margin: 0,
                }}
              >
                {editingPackage ? "Edit Package" : "Add New Package"}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 20,
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitForm}>
              {/* Field 1: Package Name */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  Package Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="e.g. Executive Umrah Package"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                  }}
                />
                {formValidationErrors.title && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: 12,
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    {formValidationErrors.title.join(", ")}
                  </div>
                )}
              </div>

              {/* Field 2: Category Dropdown */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  Category <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                    background: "#ffffff",
                  }}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {formValidationErrors.package_category_id && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: 12,
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    {formValidationErrors.package_category_id.join(", ")}
                  </div>
                )}
              </div>

              {/* Field 3: Short Description */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief summary of package inclusions and highlights..."
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Fields 4 & 5: Price & Duration */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. ৳ 1,50,000"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #d1d5db",
                      fontSize: 14,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 14 Days"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #d1d5db",
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              {/* Field 6: Image */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  Package Image {editingPackage ? "(Optional to change)" : "*"}
                </label>

                {imagePreviewUrl && (
                  <div
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 12,
                      overflow: "hidden",
                      background: "#041B18",
                      marginBottom: 10,
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp,image/gif"
                  onChange={handleFileChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: 13,
                  }}
                />
                {formValidationErrors.image && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: 12,
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    {formValidationErrors.image.join(", ")}
                  </div>
                )}
              </div>

              {/* Fields 7 & 8: Display Order & Active Status */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={displayOrder}
                    onChange={(e) =>
                      setDisplayOrder(parseInt(e.target.value) || 0)
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #d1d5db",
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={isActive ? "1" : "0"}
                    onChange={(e) => setIsActive(e.target.value === "1")}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid #d1d5db",
                      fontSize: 14,
                      background: "#ffffff",
                    }}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Modal Buttons */}
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}
              >
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    background: "#ffffff",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#374151",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 10,
                    border: "none",
                    background: "#00A86B",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingPackage
                      ? "Save Changes"
                      : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPackage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 20,
              maxWidth: 420,
              width: "100%",
              padding: 28,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#111827",
                marginBottom: 8,
              }}
            >
              Delete Package?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              Are you sure you want to delete{" "}
              <strong>"{deletingPackage.title}"</strong>? This package record
              and its image file will be permanently removed.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => setDeletingPackage(null)}
                disabled={isDeleting}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "1px solid #d1d5db",
                  background: "#ffffff",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "none",
                  background: "#dc2626",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: isDeleting ? "not-allowed" : "pointer",
                }}
              >
                {isDeleting ? "Deleting..." : "Delete Package"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
