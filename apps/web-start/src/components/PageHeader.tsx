interface PageHeaderProps {
    title: string;
    userType: "student" | "instructor" | "admin";
    actionButton?: {
        text: string;
        onClick: () => void;
    };
    userInitials?: string;
}

export default function PageHeader({ 
    title, 
    userType, 
    actionButton, 
    userInitials = "SM" 
}: PageHeaderProps) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem"
        }}>
            <div>
                <h1 style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "white",
                    margin: 0,
                    marginBottom: "0.5rem"
                }}>
                    {title}
                </h1>
                <p style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "1rem",
                    margin: 0,
                    textTransform: "capitalize"
                }}>
                    {userType}
                </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {actionButton && (
                    <button
                        onClick={actionButton.onClick}
                        style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "12px",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            fontFamily: "var(--font-geist-sans)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        {actionButton.text}
                    </button>
                )}
                <div style={{
                    width: "56px",
                    height: "56px",
                    backgroundColor: "#c2410c",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid rgba(255, 255, 255, 0.3)"
                }}>
                    <span style={{
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        fontFamily: "var(--font-geist-sans)"
                    }}>
                        {userInitials}
                    </span>
                </div>
            </div>
        </div>
    );
}