import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/AuthContext"
import {
  getGalleryApi,
  createGalleryApi,
  updateGalleryApi,
  deleteGalleryApi,
  type GalleryItem,
} from "../../services/galleryApi"

export const GalleryManager: React.FC = () => {
  const { token } = useAuth()

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)

  // Modal / Form state (SIMPLE 4 CLIENT FIELDS)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("General")
  const [displayOrder, setDisplayOrder] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formValidationErrors, setFormValidationErrors] =
    useState<Record<string, string[]>>({})

  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const fetchGallery = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setErrorNotice(null)

    const response = await getGalleryApi(token)
    if (response.success && Array.isArray(response.data)) {
      setGalleryItems(response.data)
    } else {
      setErrorNotice(response.message || "Unable to load gallery items.")
    }

    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  const openAddForm = () => {
    setEditingItem(null)
    setTitle("")
    setCategory("General")
    setDisplayOrder(galleryItems.length + 1)
    setIsActive(true)
    setSelectedFile(null)
    setImagePreviewUrl(null)
    setFormValidationErrors({})
    setIsFormOpen(true)
  }

  const openEditForm = (item: GalleryItem) => {
    setEditingItem(item)
    setTitle(item.title || "")
    setCategory(item.category || "General")
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

    if (!editingItem && !selectedFile) {
      setFormValidationErrors({
        image: ["Please select an image to upload."],
      })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    if (title) formData.append("title", title.trim())
    if (category) formData.append("category", category.trim())
    formData.append("display_order", String(displayOrder))
    formData.append("is_active", isActive ? "1" : "0")

    if (selectedFile) {
      formData.append("image", selectedFile)
    }

    let response
    if (editingItem) {
      response = await updateGalleryApi(token, editingItem.id, formData)
    } else {
      response = await createGalleryApi(token, formData)
    }

    if (response.success) {
      setSuccessNotice(
        editingItem
          ? "Gallery photo updated successfully."
          : "Gallery photo uploaded successfully.",
      )
      setIsFormOpen(false)
      fetchGallery()
    } else {
      if (response.errors) {
        setFormValidationErrors(response.errors)
      } else {
        setErrorNotice(response.message || "Unable to save photo.")
      }
    }

    setIsSubmitting(false)
  }

  const confirmDelete = async () => {
    if (!token || !deletingItem) return
    setIsDeleting(true)
    setErrorNotice(null)
    setSuccessNotice(null)

    const response = await deleteGalleryApi(token, deletingItem.id)

    if (response.success) {
      setSuccessNotice("Gallery photo deleted successfully.")
      setDeletingItem(null)
      fetchGallery()
    } else {
      setErrorNotice(response.message || "Unable to delete photo.")
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
            Gallery Management
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Upload & organize photos of tours, Hajj, Umrah, office & agency
            achievements.
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
          + Upload Photo
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

      {/* Grid view of gallery items */}
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
          Loading gallery photos...
        </div>
      ) : galleryItems.length === 0 ? (
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
            No Gallery Photos Uploaded
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
            Click the button below to upload your first photo.
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
            + Upload Photo
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: 160,
                  background: "#041B18",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.title || "Gallery"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: 12,
                    background: item.is_active ? "#dcfce7" : "#fee2e2",
                    color: item.is_active ? "#15803d" : "#b91c1c",
                  }}
                >
                  {item.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div style={{ padding: 16, flexGrow: 1 }}>
                <div
                  style={{ fontWeight: 800, color: "#111827", fontSize: 14 }}
                >
                  {item.title || "Untitled Photo"}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                  Category: <strong>{item.category || "General"}</strong> •
                  Order: #{item.display_order}
                </div>
              </div>

              <div
                style={{
                  padding: "12px 16px",
                  background: "#f9fafb",
                  borderTop: "1px solid #f3f4f6",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => openEditForm(item)}
                  style={{
                    background: "#ffffff",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    padding: "6px 12px",
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
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
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
              maxWidth: 480,
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
                {editingItem ? "Edit Gallery Photo" : "Upload Gallery Photo"}
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
                  Title / Caption
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Umrah Group 2026 Kaaba Visit"
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
                  Tag / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    fontSize: 14,
                    background: "#ffffff",
                  }}
                >
                  <option value="General">General</option>
                  <option value="Hajj">Hajj</option>
                  <option value="Umrah">Umrah</option>
                  <option value="Tour">Tour</option>
                  <option value="Office">Office & Agency</option>
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
                  Photo File {editingItem ? "(Optional to replace)" : "*"}
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
                      : "Upload Photo"}
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
              Delete Photo?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              Are you sure you want to delete this gallery photo? The image file
              will be permanently removed from server storage.
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
                {isDeleting ? "Deleting..." : "Delete Photo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
