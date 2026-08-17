import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/AuthContext"
import {
  getHeroSlidesApi,
  createHeroSlideApi,
  updateHeroSlideApi,
  deleteHeroSlideApi,
  type HeroSlideItem,
} from "../../services/heroSlideApi"

export const HeroSlidesManager: React.FC = () => {
  const { token } = useAuth()

  const [slides, setSlides] = useState<HeroSlideItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null)

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [buttonUrl, setButtonUrl] = useState("")
  const [displayOrder, setDisplayOrder] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formValidationErrors, setFormValidationErrors] =
    useState<Record<string, string[]>>({})

  // Delete modal state
  const [deletingSlide, setDeletingSlide] = useState<HeroSlideItem | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const fetchSlides = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setErrorNotice(null)

    const response = await getHeroSlidesApi(token)
    if (response.success && Array.isArray(response.data)) {
      setSlides(response.data)
    } else {
      setErrorNotice(response.message || "Failed to load hero slides.")
    }

    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchSlides()
  }, [fetchSlides])

  const openAddForm = () => {
    setEditingSlide(null)
    setTitle("")
    setSubtitle("")
    setButtonText("")
    setButtonUrl("")
    setDisplayOrder(slides.length + 1)
    setIsActive(true)
    setSelectedFile(null)
    setImagePreviewUrl(null)
    setFormValidationErrors({})
    setIsFormOpen(true)
  }

  const openEditForm = (slide: HeroSlideItem) => {
    setEditingSlide(slide)
    setTitle(slide.title || "")
    setSubtitle(slide.subtitle || "")
    setButtonText(slide.button_text || "")
    setButtonUrl(slide.button_url || "")
    setDisplayOrder(slide.display_order ?? 0)
    setIsActive(slide.is_active ?? true)
    setSelectedFile(null)
    setImagePreviewUrl(slide.image_url || null)
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

    if (!editingSlide && !selectedFile) {
      setFormValidationErrors({
        image: ["Please select an image file for the new hero slide."],
      })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    if (title) formData.append("title", title)
    if (subtitle) formData.append("subtitle", subtitle)
    if (buttonText) formData.append("button_text", buttonText)
    if (buttonUrl) formData.append("button_url", buttonUrl)
    formData.append("display_order", String(displayOrder))
    formData.append("is_active", isActive ? "1" : "0")

    if (selectedFile) {
      formData.append("image", selectedFile)
    }

    let response
    if (editingSlide) {
      response = await updateHeroSlideApi(token, editingSlide.id, formData)
    } else {
      response = await createHeroSlideApi(token, formData)
    }

    if (response.success) {
      setSuccessNotice(
        editingSlide
          ? "Hero slide updated successfully."
          : "Hero slide created successfully.",
      )
      setIsFormOpen(false)
      fetchSlides()
    } else {
      if (response.errors) {
        setFormValidationErrors(response.errors)
      } else {
        setErrorNotice(response.message || "Action failed.")
      }
    }

    setIsSubmitting(false)
  }

  const confirmDelete = async () => {
    if (!token || !deletingSlide) return
    setIsDeleting(true)
    setErrorNotice(null)
    setSuccessNotice(null)

    const response = await deleteHeroSlideApi(token, deletingSlide.id)

    if (response.success) {
      setSuccessNotice("Hero slide deleted successfully.")
      setDeletingSlide(null)
      fetchSlides()
    } else {
      setErrorNotice(response.message || "Failed to delete hero slide.")
    }

    setIsDeleting(false)
  }

  return (
    <div>
      {/* Top Action Bar */}
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
            Hero Slides Management
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Upload, manage, order, and toggle status of Hero Slides stored in
            Laravel storage.
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
          + Add New Hero Slide
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

      {/* Main Table View */}
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
          Loading hero slides...
        </div>
      ) : slides.length === 0 ? (
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
            No Hero Slides Found
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
            Create your first hero slide to manage banner images.
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
            + Create Hero Slide
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
                <th style={{ padding: "16px 20px" }}>Image Preview</th>
                <th style={{ padding: "16px 20px" }}>Title & Subtitle</th>
                <th style={{ padding: "16px 20px" }}>Display Order</th>
                <th style={{ padding: "16px 20px" }}>Status</th>
                <th style={{ padding: "16px 20px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide) => (
                <tr
                  key={slide.id}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background 0.15s",
                  }}
                >
                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        width: 100,
                        height: 56,
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "#041B18",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <img
                        src={slide.image_url}
                        alt={slide.title || "Hero Slide"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ fontWeight: 800, color: "#111827" }}>
                      {slide.title || (
                        <span style={{ color: "#9ca3af" }}>No Title</span>
                      )}
                    </div>
                    {slide.subtitle && (
                      <div
                        style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}
                      >
                        {slide.subtitle}
                      </div>
                    )}
                    {slide.button_text && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "#00A86B",
                          marginTop: 4,
                          fontWeight: 700,
                        }}
                      >
                        Button: {slide.button_text} ({slide.button_url || "#"})
                      </div>
                    )}
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
                      #{slide.display_order}
                    </span>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: slide.is_active ? "#dcfce7" : "#fee2e2",
                        color: slide.is_active ? "#15803d" : "#b91c1c",
                      }}
                    >
                      {slide.is_active ? "Active" : "Inactive"}
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
                        onClick={() => openEditForm(slide)}
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
                        onClick={() => setDeletingSlide(slide)}
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

      {/* Add / Edit Slide Modal */}
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
                {editingSlide ? "Edit Hero Slide" : "Add New Hero Slide"}
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
              {/* Title Field */}
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
                  Slide Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Your Journey Begins With the Right Partner"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Subtitle Field */}
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
                  Slide Subtitle (Optional)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Reliable travel, visa & pilgrimage services"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Image Upload & Preview */}
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
                  Slide Image{" "}
                  {editingSlide
                    ? "(Leave blank to keep existing)"
                    : "(Required)"}
                </label>

                {imagePreviewUrl && (
                  <div
                    style={{
                      width: "100%",
                      height: 160,
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

              {/* Button Text & URL */}
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
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Explore Services"
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
                    Button Link URL
                  </label>
                  <input
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    placeholder="#services"
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

              {/* Display Order & Active Status */}
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
                    Slide Status
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

              {/* Action Buttons */}
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
                    : editingSlide
                      ? "Save Changes"
                      : "Upload & Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingSlide && (
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
              Delete Hero Slide?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              Are you sure you want to delete this hero slide? The slide record
              and its image file will be permanently removed.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => setDeletingSlide(null)}
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
                {isDeleting ? "Deleting..." : "Delete Slide"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
