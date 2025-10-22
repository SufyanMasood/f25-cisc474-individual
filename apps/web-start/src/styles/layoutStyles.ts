export const layoutStyles = {
  // Full page gradient background (used on all pages)
  pageBackground: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "var(--font-geist-sans)",
  },

  // Flex container for sidebar + content
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
  },

  // Main content area (right side after navbar)
  mainContent: {
    flex: 1,
    padding: "2rem",
  },

  // Loading/Error state containers
  centerMessage: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "var(--font-geist-sans)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
};