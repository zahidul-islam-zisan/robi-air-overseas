import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../context/AuthContext"
import {
  getContactMessagesApi,
  markContactMessageReadApi,
  deleteContactMessageApi,
  type ContactMessageItem,
} from "../../services/contactApi"

export const ContactMessagesManager: React.FC = () => {
  const { token } = useAuth()

  const [messages, setMessages] = useState<ContactMessageItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [successNotice, setSuccessNotice] = useState<string | null>(null)

  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageItem | null>(null)
  const [deletingMessage, setDeletingMessage] =
    useState<ContactMessageItem | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const fetchMessages = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setErrorNotice(null)

    const response = await getContactMessagesApi(token)
    if (response.success && Array.isArray(response.data)) {
      setMessages(response.data)
    } else {
      setErrorNotice(response.message || "Unable to load contact messages.")
    }

    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const openMessageModal = async (msg: ContactMessageItem) => {
    setSelectedMessage(msg)
    if (token && msg.status !== "read") {
      await markContactMessageReadApi(token, msg.id, "read")
      fetchMessages()
    }
  }

  const confirmDelete = async () => {
    if (!token || !deletingMessage) return
    setIsDeleting(true)
    setErrorNotice(null)
    setSuccessNotice(null)

    const response = await deleteContactMessageApi(token, deletingMessage.id)

    if (response.success) {
      setSuccessNotice("Contact message deleted successfully.")
      setDeletingMessage(null)
      if (selectedMessage?.id === deletingMessage.id) {
        setSelectedMessage(null)
      }
      fetchMessages()
    } else {
      setErrorNotice(response.message || "Unable to delete contact message.")
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
          Contact Messages Management
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "#6b7280",
            marginTop: 4,
            marginBottom: 0,
          }}
        >
          View inquiries submitted through the public website contact form.
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
          Loading contact messages...
        </div>
      ) : messages.length === 0 ? (
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
            No Contact Messages
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 0 }}>
            Any message submitted from the contact section will appear here
            automatically.
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
                <th style={{ padding: "16px 20px" }}>Sender</th>
                <th style={{ padding: "16px 20px" }}>Contact Info</th>
                <th style={{ padding: "16px 20px" }}>Subject</th>
                <th style={{ padding: "16px 20px" }}>Status</th>
                <th style={{ padding: "16px 20px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    background: msg.status === "unread" ? "#f0fdf4" : "#ffffff",
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
                      {msg.name}
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#00A86B",
                        fontSize: 13,
                      }}
                    >
                      📞 {msg.phone}
                    </div>
                    {msg.email && (
                      <div
                        style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}
                      >
                        ✉ {msg.email}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#374151",
                        fontSize: 13,
                      }}
                    >
                      {msg.subject || "General Inquiry"}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        marginTop: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {msg.message}
                    </div>
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: 20,
                        background:
                          msg.status === "unread" ? "#fef3c7" : "#e0e7ff",
                        color: msg.status === "unread" ? "#92400e" : "#3730a3",
                      }}
                    >
                      {msg.status === "unread" ? "New Message" : "Read"}
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
                        onClick={() => openMessageModal(msg)}
                        style={{
                          background: "#00A86B",
                          color: "#ffffff",
                          border: "none",
                          padding: "6px 14px",
                          borderRadius: 8,
                          fontWeight: 700,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingMessage(msg)}
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

      {/* View Modal */}
      {selectedMessage && (
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
                Message Details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
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

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#6b7280" }}>Sender Name</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
                {selectedMessage.name}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Phone Number
                </div>
                <div
                  style={{ fontSize: 14, fontWeight: 800, color: "#00A86B" }}
                >
                  {selectedMessage.phone}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>Email</div>
                <div
                  style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}
                >
                  {selectedMessage.email || "N/A"}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#6b7280" }}>Subject</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                {selectedMessage.subject || "General Inquiry"}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
                Message Content
              </div>
              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#1f2937",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedMessage.message}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                style={{
                  padding: "10px 24px",
                  borderRadius: 10,
                  border: "none",
                  background: "#374151",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMessage && (
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
              Delete Message?
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginBottom: 24,
                lineHeight: 1.5,
              }}
            >
              Are you sure you want to delete message from{" "}
              <strong>"{deletingMessage.name}"</strong>?
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button
                type="button"
                onClick={() => setDeletingMessage(null)}
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
                {isDeleting ? "Deleting..." : "Delete Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
