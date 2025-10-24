import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react'

export const Route = createFileRoute('/login/')({
  component: LoginPage
})

function LoginPage() {
    const [userType, setUserType] = useState<"student" | "instructor" | "admin">("student");
    const { loginWithRedirect } = useAuth0();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save userType to localStorage so home.tsx can use it
        localStorage.setItem('userType', userType);
        loginWithRedirect({ appState: { userType } });
    };

    return (
        <div style={{ 
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            fontFamily: "var(--font-geist-sans)"
        }}>
            <div style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "3rem",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "450px",
                border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
                <div style={{ marginBottom: "1rem" }}>
                    <Link 
                        to="/" 
                        style={{ 
                            color: "#667eea", 
                            textDecoration: "none", 
                            fontSize: "0.875rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            transition: "color 0.2s"
                        }}
                    >
                        ← Back to CodeCollab
                    </Link>
                </div>

                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#667eea",
                        borderRadius: "20px",
                        margin: "0 auto 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)"
                    }}>
                        <span style={{ fontSize: "2rem", color: "white", fontWeight: "bold" }}>💻</span>
                    </div>
                    <h1 style={{ 
                        fontSize: "2.5rem", 
                        fontWeight: "bold", 
                        color: "#1f2937", 
                        marginBottom: "0.5rem",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "var(--font-geist-sans)"
                    }}>
                        Welcome!
                    </h1>
                    <p style={{ color: "#6b7280", fontSize: "1rem", fontFamily: "var(--font-geist-sans)" }}>
                        Sign in to continue your coding journey
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                        <label 
                            htmlFor="userType" 
                            style={{ 
                                display: "block", 
                                fontSize: "0.875rem", 
                                fontWeight: "600", 
                                color: "#374151", 
                                marginBottom: "0.5rem",
                                fontFamily: "var(--font-geist-sans)"
                            }}
                        >
                            User Type
                        </label>
                        <select
                            id="userType"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value as "student" | "instructor" | "admin")}
                            style={{
                                width: "100%",
                                padding: "0.75rem 1rem",
                                border: "2px solid #e5e7eb",
                                borderRadius: "12px",
                                fontSize: "0.875rem",
                                outline: "none",
                                transition: "border-color 0.2s",
                                backgroundColor: "white",
                                fontFamily: "var(--font-geist-sans)",
                                cursor: "pointer"
                            }}
                            onFocus={(e) => {
                                const target = e.target as HTMLSelectElement;
                                target.style.borderColor = "#667eea";
                            }}
                            onBlur={(e) => {
                                const target = e.target as HTMLSelectElement;
                                target.style.borderColor = "#e5e7eb";
                            }}
                        >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <button 
                        type="submit"
                        onClick={() => loginWithRedirect({ authorizationParams: { scope: 'read:assignments', prompt: 'consent' }, })}
                        style={{
                            width: "100%",
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            color: "white",
                            padding: "0.875rem 1rem",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                            fontFamily: "var(--font-geist-sans)"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                        }}
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}