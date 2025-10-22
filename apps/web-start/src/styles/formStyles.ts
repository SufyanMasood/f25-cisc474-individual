export const formStyles = {
  // Form field wrapper (spacing between fields)
  fieldWrapper: {
    marginBottom: "1.5rem",
  },

  // Label styles
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#374151",
    fontSize: "0.875rem",
  },

  // Text input styles
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.875rem",
  },

  // Textarea styles
  textarea: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    resize: "vertical" as const,
  },

  // Button container (for form action buttons)
  buttonContainer: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
  },

  // Success message
  successMessage: {
    padding: "1rem",
    backgroundColor: "#eff6ff",
    borderRadius: "8px",
    marginBottom: "1rem",
    color: "#1e40af",
  },

  // Error message
  errorMessage: {
    padding: "1rem",
    backgroundColor: "#fee",
    borderRadius: "8px",
    marginBottom: "1rem",
    color: "#dc2626",
  },
}