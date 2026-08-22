import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/AuthContext"
import {
  getTestimonialsApi,
  createTestimonialApi,
  updateTestimonialApi,
  deleteTestimonialApi,
  type TestimonialItem,
} from "../../services/testimonialApi"

export const TestimonialsManager: React.FC = () => {
  const { token } = useAuth()

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)

  // Modal / Form state (SIMPLE 6 CLIENT FIELDS)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null)

  const [customerName, setCustomerName] = useState("")
  const [customerRole, setCustomerRole] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState<number>(5)
  const [displayOrder, setDisplayOrder] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formValidationErrors, setFormValidationErrors] =
    useState<Record<string, string[]>>({})

  const [deletingItem, setDeletingItem] = useState<TestimonialItem | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const fetchTestimonials = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setErrorNotice(null)

    const response = await getTestimonialsApi(token)
    if (response.success && Array.isArray(response.data)) {
      setTestimonials(response.data)
    } else {
      setErrorNotice(response.message || "Unable to load testimonials.")
    }

    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const openAddForm = () => {
    setEditingItem(null)
    setCustomerName("")
    setCustomerRole("")
    setMessage("")
    setRating(5)
    setDisplayOrder(testimonials.length + 1)
    setIsActive(true)
    setSelectedFile(null)
    setImagePreviewUrl(null)
    setFormValidationErrors({})
    setIsFormOpen(true)
  }

  const openEditForm = (item: TestimonialItem) => {
    setEditingItem(item)
    setCustomerName(item.customer_name || "")
    setCustomerRole(item.customer_role || "")
    setMessage(item.message || "")
    setRating(item.rating ?? 5)
    setDisplayOrder(item.display_order ?? 0)
    setIsActive(item.is_active ?? true)
    setSelectedFile(null)
    setImagePreviewUrl(item.image_url || null)
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

    if (!customerName.trim()) {
      setFormValidationErrors({
        customer_name: ["Client name is required."],
      })
      return
    }

    if (!message.trim()) {
      setFormValidationErrors({
        message: ["Feedback message is required."],
      })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("customer_name", customerName.trim())
    if (customerRole) formData.append("customer_role", customerRole.trim())
    formData.append("message", message.trim())
    formData.append("rating", String(rating))
    formData.append("display_order", String(displayOrder))
    formData.append("is_active", isActive ? "1" : "0")

    if (selectedFile) {
      formData.append("image", selectedFile)
    }

    let response
    if (editingItem) {
      response = await updateTestimonialApi(token, editingItem.id, formData)
    } else {
      response = await createTestimonialApi(token, formData)
    }

    if (response.success) {
      setSuccessNotice(
        editingItem
          ? "Testimonial updated successfully."
          : "Testimonial created successfully.",
      )
      setIsFormOpen(false)
      fetchTestimonials()
    } else {
      if (response.errors) {
        setFormValidationErrors(response.errors)
      } else {
        setErrorNotice(response.message || "Unable to save testimonial.")
      }
    }

    setIsSubmitting(false)
  }

  const confirmDelete = async () => {
    if (!token || !deletingItem) return
    setIsDeleting(true)
    setErrorNotice(null)
    setSuccessNotice(null)

    const response = await deleteTestimonialApi(token, deletingItem.id)

    if (response.success) {
      setSuccessNotice("Testimonial deleted successfully.")
      setDeletingItem(null)
      fetchTestimonials()
    } else {
      setErrorNotice(response.message || "Unable to delete testimonial.")
    }

    setIsDeleting(false)
  }

  return (
    <div>
      {/* Header */}
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
            Testimonials Management
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Manage client reviews, ratings, and feedback for Hajj, Umrah &
            overseas services.
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
          + Add Testimonial
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

      {/* Table view */}
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
          Loading testimonials...
        </div>
      ) : testimonials.length === 0 ? (
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
            No Testimonials Found
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
            Click the button below to add client feedback.
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
            + Add Testimonial
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
                <th style={{ padding: "16px 20px" }}>Avatar</th>
                <th style={{ padding: "16px 20px" }}>Client Name</th>
                <th style={{ padding: "16px 20px" }}>Rating</th>
                <th style={{ padding: "16px 20px" }}>Status</th>
                <th style={{ padding: "16px 20px" }}>Order</th>
                <th style={{ padding: "16px 20px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background 0.15s",
                  }}
                >
                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#041B18",
                        border: "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6ee7b7",
                        fontWeight: 800,
                      }}
                    >
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.customer_name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        item.customer_name.charAt(0).toUpperCase()
                      )}
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
                      {item.customer_name}
                    </div>
                    {item.customer_role && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "#053B36",
                          fontWeight: 700,
                          marginTop: 2,
                        }}
                      >
                        {item.customer_role}
                      </div>
                    )}
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
                      "{item.message}"
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        color: "#f59e0b",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {"★".repeat(item.rating || 5)}
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: item.is_active ? "#dcfce7" : "#fee2e2",
                        color: item.is_active ? "#15803d" : "#b91c1c",
                      }}
                    >
                      {item.is_active ? "Active" : "Inactive"}
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
                      #{item.display_order}
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
                        onClick={() => openEditForm(item)}
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
                        onClick={() => setDeletingItem(item)}
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
                {editingItem ? "Edit Testimonial" : "Add Testimonial"}
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
                  Client Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Haji Mohammad Rafiq"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                  }}
                />
                {formValidationErrors.customer_name && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: 12,
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    {formValidationErrors.customer_name.join(", ")}
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
                  Designation / Service Received
                </label>
                <input
                  type="text"
                  value={customerRole}
                  onChange={(e) => setCustomerRole(e.target.value)}
                  placeholder="e.g. VIP Umrah Package 2026 / Qatar Employment Visa"
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
                  Feedback Message <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write client testimonial message..."
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
                {formValidationErrors.message && (
                  <div
                    style={{
                      color: "#dc2626",
                      fontSize: 12,
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    {formValidationErrors.message.join(", ")}
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
                  Rating (1 to 5 Stars)
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                    background: "#ffffff",
                  }}
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                  <option value={2}>★★☆☆☆ (2 Stars)</option>
                  <option value={1}>★☆☆☆☆ (1 Star)</option>
                </select>
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
                  Client Avatar Photo (Optional)
                </label>

                {imagePreviewUrl && (
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
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
                    : editingItem
                      ? "Save Changes"
                      : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingItem && (
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
              Delete Testimonial?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              Are you sure you want to delete review from{" "}
              <strong>"{deletingItem.customer_name}"</strong>?
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
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
                {isDeleting ? "Deleting..." : "Delete Testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
