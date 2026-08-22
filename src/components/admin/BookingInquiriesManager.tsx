import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/AuthContext"
import {
  getBookingInquiriesApi,
  updateInquiryStatusApi,
  deleteBookingInquiryApi,
  type BookingInquiryItem,
} from "../../services/inquiryApi"

export const BookingInquiriesManager: React.FC = () => {
  const { token } = useAuth()

  const [inquiries, setInquiries] = useState<BookingInquiryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)

  const [deletingInquiry, setDeletingInquiry] =
    useState<BookingInquiryItem | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const fetchInquiries = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setErrorNotice(null)

    const response = await getBookingInquiriesApi(token)
    if (response.success && Array.isArray(response.data)) {
      setInquiries(response.data)
    } else {
      setErrorNotice(response.message || "Unable to load booking inquiries.")
    }

    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchInquiries()
  }, [fetchInquiries])

  const handleStatusChange = async (
    inquiryId: number,
    newStatus: "pending" | "contacted" | "confirmed" | "cancelled",
  ) => {
    if (!token) return
    setErrorNotice(null)
    setSuccessNotice(null)

    const response = await updateInquiryStatusApi(token, inquiryId, newStatus)
    if (response.success) {
      setSuccessNotice("Inquiry status updated.")
      fetchInquiries()
    } else {
      setErrorNotice(response.message || "Unable to update status.")
    }
  }

  const confirmDelete = async () => {
    if (!token || !deletingInquiry) return
    setIsDeleting(true)
    setErrorNotice(null)
    setSuccessNotice(null)

    const response = await deleteBookingInquiryApi(token, deletingInquiry.id)

    if (response.success) {
      setSuccessNotice("Booking inquiry deleted successfully.")
      setDeletingInquiry(null)
      fetchInquiries()
    } else {
      setErrorNotice(response.message || "Unable to delete booking inquiry.")
    }

    setIsDeleting(false)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{ fontSize: 24, fontWeight: 800, color: "#111827", margin: 0 }}
        >
          Booking Inquiries Management
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "#6b7280",
            marginTop: 4,
            marginBottom: 0,
          }}
        >
          Track & respond to Hajj, Umrah & travel package booking requests from
          clients.
        </p>
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
          Loading booking inquiries...
        </div>
      ) : inquiries.length === 0 ? (
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
            No Booking Inquiries
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 0 }}>
            Client package booking inquiries will appear here automatically.
          </p>
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
                <th style={{ padding: "16px 20px" }}>Client</th>
                <th style={{ padding: "16px 20px" }}>Contact</th>
                <th style={{ padding: "16px 20px" }}>Requested Package</th>
                <th style={{ padding: "16px 20px" }}>Travelers / Date</th>
                <th style={{ padding: "16px 20px" }}>Status</th>
                <th style={{ padding: "16px 20px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((item) => (
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
                        fontWeight: 800,
                        color: "#111827",
                        fontSize: 14,
                      }}
                    >
                      {item.name}
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        fontWeight: 800,
                        color: "#00A86B",
                        fontSize: 13,
                      }}
                    >
                      📞 {item.phone}
                    </div>
                    {item.email && (
                      <div
                        style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}
                      >
                        ✉ {item.email}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: 8,
                        background: "rgba(0, 168, 107, 0.1)",
                        color: "#053B36",
                        border: "1px solid rgba(0, 168, 107, 0.2)",
                      }}
                    >
                      {item.package?.title || "General Booking"}
                    </span>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#374151",
                        fontSize: 13,
                      }}
                    >
                      👥 {item.number_of_people || 1} Person(s)
                    </div>
                    {item.travel_date && (
                      <div
                        style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}
                      >
                        🗓 {item.travel_date}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          e.target
                            .value as "pending" | "contacted" | "confirmed" | "cancelled",
                        )
                      }
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 800,
                        border: "1px solid #d1d5db",
                        background:
                          item.status === "confirmed"
                            ? "#dcfce7"
                            : item.status === "contacted"
                              ? "#e0e7ff"
                              : item.status === "cancelled"
                                ? "#fee2e2"
                                : "#fef3c7",
                        color:
                          item.status === "confirmed"
                            ? "#15803d"
                            : item.status === "contacted"
                              ? "#3730a3"
                              : item.status === "cancelled"
                                ? "#b91c1c"
                                : "#92400e",
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => setDeletingInquiry(item)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingInquiry && (
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
              Delete Booking Inquiry?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              Are you sure you want to delete inquiry from{" "}
              <strong>"{deletingInquiry.name}"</strong>?
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => setDeletingInquiry(null)}
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
                {isDeleting ? "Deleting..." : "Delete Inquiry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
