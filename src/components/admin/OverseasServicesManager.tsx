import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/AuthContext"
import {
  getOverseasServicesApi,
  createOverseasServiceApi,
  updateOverseasServiceApi,
  deleteOverseasServiceApi,
  type OverseasServiceItem,
} from "../../services/overseasApi"

export const OverseasServicesManager: React.FC = () => {
  const { token } = useAuth()

  const [services, setServices] = useState<OverseasServiceItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)

  // Modal / Form state (SIMPLE 5 CLIENT FIELDS)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [editingService, setEditingService] =
    useState<OverseasServiceItem | null>(null)

  const [title, setTitle] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const [displayOrder, setDisplayOrder] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formValidationErrors, setFormValidationErrors] =
    useState<Record<string, string[]>>({})

  const [deletingService, setDeletingService] =
    useState<OverseasServiceItem | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const fetchServices = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setErrorNotice(null)

    const response = await getOverseasServicesApi(token)
    if (response.success && Array.isArray(response.data)) {
      setServices(response.data)
    } else {
      setErrorNotice(response.message || "Unable to load overseas services.")
    }

    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const openAddForm = () => {
    setEditingService(null)
    setTitle("")
    setCountry("")
    setDescription("")
    setDisplayOrder(services.length + 1)
    setIsActive(true)
    setSelectedFile(null)
    setImagePreviewUrl(null)
    setFormValidationErrors({})
    setIsFormOpen(true)
  }

  const openEditForm = (svc: OverseasServiceItem) => {
    setEditingService(svc)
    setTitle(svc.title || "")
    setCountry(svc.country || "")
    setDescription(svc.description || "")
    setDisplayOrder(svc.display_order ?? 0)
    setIsActive(svc.is_active ?? true)
    setSelectedFile(null)
    setImagePreviewUrl(svc.image_url || null)
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

    if (!title.trim()) {
      setFormValidationErrors({
        title: ["Service Title is required."],
      })
      return
    }

    if (!editingService && !selectedFile) {
      setFormValidationErrors({
        image: ["Please select an image for the overseas service."],
      })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", title.trim())
    if (country) formData.append("country", country.trim())
    if (description) formData.append("description", description.trim())
    formData.append("display_order", String(displayOrder))
    formData.append("is_active", isActive ? "1" : "0")

    if (selectedFile) {
      formData.append("image", selectedFile)
    }

    let response
    if (editingService) {
      response = await updateOverseasServiceApi(
        token,
        editingService.id,
        formData,
      )
    } else {
      response = await createOverseasServiceApi(token, formData)
    }

    if (response.success) {
      setSuccessNotice(
        editingService
          ? "Overseas service updated successfully."
          : "Overseas service created successfully.",
      )
      setIsFormOpen(false)
      fetchServices()
    } else {
      if (response.errors) {
        setFormValidationErrors(response.errors)
      } else {
        setErrorNotice(response.message || "Unable to save overseas service.")
      }
    }

    setIsSubmitting(false)
  }

  const confirmDelete = async () => {
    if (!token || !deletingService) return
    setIsDeleting(true)
    setErrorNotice(null)
    setSuccessNotice(null)

    const response = await deleteOverseasServiceApi(token, deletingService.id)

    if (response.success) {
      setSuccessNotice("Overseas service deleted successfully.")
      setDeletingService(null)
      fetchServices()
    } else {
      setErrorNotice(response.message || "Unable to delete overseas service.")
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
            Overseas Services Management
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Manage manpower recruitment, employment & country-specific overseas
            placement services.
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
          + Add Overseas Service
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
          Loading overseas services...
        </div>
      ) : services.length === 0 ? (
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
            No Overseas Services Found
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
            Click the button below to add your first overseas recruitment
            service.
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
            + Add Service
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
                <th style={{ padding: "16px 20px" }}>Service Title</th>
                <th style={{ padding: "16px 20px" }}>Target Country</th>
                <th style={{ padding: "16px 20px" }}>Status</th>
                <th style={{ padding: "16px 20px" }}>Order</th>
                <th style={{ padding: "16px 20px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr
                  key={svc.id}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background 0.15s",
                  }}
                >
                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        width: 72,
                        height: 52,
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "#041B18",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <img
                        src={svc.image_url}
                        alt={svc.title}
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
                      {svc.title}
                    </div>
                    {svc.description && (
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
                        {svc.description}
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
                        background: "#e0f2fe",
                        color: "#0369a1",
                        border: "1px solid #bae6fd",
                      }}
                    >
                      ✈ {svc.country || "Global"}
                    </span>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: svc.is_active ? "#dcfce7" : "#fee2e2",
                        color: svc.is_active ? "#15803d" : "#b91c1c",
                      }}
                    >
                      {svc.is_active ? "Active" : "Inactive"}
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
                      #{svc.display_order}
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
                        onClick={() => openEditForm(svc)}
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
                        onClick={() => setDeletingService(svc)}
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

      {/* Form Modal */}
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
              maxWidth: 520,
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
                {editingService
                  ? "Edit Overseas Service"
                  : "Add Overseas Service"}
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
                  Service Title <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Saudi Arabia Manpower Visa"
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
                  Target Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Qatar, UAE, Malaysia, Saudi Arabia"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                  }}
                />
              </div>

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
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of job opportunities & overseas placement requirements..."
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
                  Service Image {editingService ? "(Optional to change)" : "*"}
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
                    : editingService
                      ? "Save Changes"
                      : "Create Overseas Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingService && (
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
              Delete Overseas Service?
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
              <strong>"{deletingService.title}"</strong>? This service record
              and its image file will be permanently removed.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => setDeletingService(null)}
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
                {isDeleting ? "Deleting..." : "Delete Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
