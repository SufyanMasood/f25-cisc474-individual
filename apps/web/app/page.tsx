"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function HomePage() {
    return (
        <div style={{ 
            minHeight: "100vh", 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontFamily: "var(--font-geist-sans)"
        }}>
            <nav style={{
                // header
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 2rem",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                }}>
                    <span style={{ fontSize: "1.5rem" }}>💻</span>
                    <h2 style={{ 
                        color: "white", 
                        fontSize: "1.5rem", 
                        fontWeight: "bold",
                        margin: 0,
                        fontFamily: "var(--font-geist-sans)"
                    }}>
                        CodeCollab
                    </h2>
                </div>
                
                <div>
                    <Link href="/login">
                        <Button
                            // go to login page
                            appName="docs"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                padding: "0.5rem 1.5rem",
                                borderRadius: "25px",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                backdropFilter: "blur(10px)",
                                fontFamily: "var(--font-geist-sans)"
                            }}
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>
            </nav>
            <section style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "4rem 2rem",
                minHeight: "calc(100vh - 80px)"
            }}>
                <div style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "30px",
                    padding: "4rem 3rem",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.1)",
                    maxWidth: "900px",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                }}>
                    <div style={{
                        width: "120px",
                        height: "120px",
                        backgroundColor: "#667eea",
                        borderRadius: "30px",
                        margin: "0 auto 2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)"
                    }}>
                        <span style={{ fontSize: "3rem", color: "white" }}>💻</span>
                    </div>

                    <h1 style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontWeight: "bold",
                        marginBottom: "1.5rem",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        lineHeight: "1.2",
                        fontFamily: "var(--font-geist-sans)"
                    }}>
                        Welcome to CodeCollab
                    </h1>

                    <p style={{
                        fontSize: "1.25rem",
                        color: "#6b7280",
                        marginBottom: "3rem",
                        lineHeight: "1.6",
                        maxWidth: "600px",
                        margin: "0 auto 3rem",
                        fontFamily: "var(--font-geist-sans)"
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate metus in lacus ullamcorper, ac dignissim dui feugiat. Donec ultrices sollicitudin orci dictum bibendum. 
                    </p>

                    <div style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>
                        <Link href="/login">
                            <Button
                                // go to login page
                                appName="docs"
                                style={{
                                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                                    color: "white",
                                    padding: "1rem 2rem",
                                    border: "none",
                                    borderRadius: "15px",
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                                    minWidth: "160px",
                                    fontFamily: "var(--font-geist-sans)"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.6)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
                                }}
                            >
                                Get Started
                            </Button>
                        </Link>
                        
                        <Button
                            appName="docs"
                            style={{
                                backgroundColor: "transparent",
                                color: "#667eea",
                                padding: "1rem 2rem",
                                border: "2px solid #667eea",
                                borderRadius: "15px",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                minWidth: "160px",
                                fontFamily: "var(--font-geist-sans)"
                            }}
                            onClick={() => {
                                // scroll down
                                window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#667eea";
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#667eea";
                            }}
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* features section */}
            <section id="features" style={{
                padding: "4rem 2rem",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h2 style={{
                        fontSize: "clamp(2rem, 4vw, 2.5rem)",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                        marginBottom: "3rem",
                        fontFamily: "var(--font-geist-sans)"
                    }}>
                        Lorem ipsum dolor sit amet.
                    </h2>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem"
                    }}>

                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "20px",
                            padding: "2rem",
                            textAlign: "center",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s",
                            cursor: "pointer"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                        >
                            <div style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#667eea",
                                borderRadius: "15px",
                                margin: "0 auto 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span style={{ fontSize: "1.5rem", color: "white" }}>👨‍🎓</span>
                            </div>
                            <h3 style={{ 
                                fontSize: "1.5rem", 
                                fontWeight: "bold", 
                                color: "#1f2937", 
                                marginBottom: "1rem",
                                fontFamily: "var(--font-geist-sans)"
                            }}>
                                For Students
                            </h3>
                            <p style={{ 
                                color: "#6b7280", 
                                lineHeight: "1.6",
                                fontFamily: "var(--font-geist-sans)"
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate metus in lacus ullamcorper, ac dignissim dui feugiat.
                            </p>
                        </div>

                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "20px",
                            padding: "2rem",
                            textAlign: "center",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s",
                            cursor: "pointer"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                        >
                            <div style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#764ba2",
                                borderRadius: "15px",
                                margin: "0 auto 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span style={{ fontSize: "1.5rem", color: "white" }}>👨‍🏫</span>
                            </div>
                            <h3 style={{ 
                                fontSize: "1.5rem", 
                                fontWeight: "bold", 
                                color: "#1f2937", 
                                marginBottom: "1rem",
                                fontFamily: "var(--font-geist-sans)"
                            }}>
                                For Instructors
                            </h3>
                            <p style={{ 
                                color: "#6b7280", 
                                lineHeight: "1.6",
                                fontFamily: "var(--font-geist-sans)"
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate metus in lacus ullamcorper, ac dignissim dui feugiat.
                            </p>
                        </div>

                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "20px",
                            padding: "2rem",
                            textAlign: "center",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s",
                            cursor: "pointer"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                        >
                            <div style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#667eea",
                                borderRadius: "15px",
                                margin: "0 auto 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span style={{ fontSize: "1.5rem", color: "white" }}>⚙️</span>
                            </div>
                            <h3 style={{ 
                                fontSize: "1.5rem", 
                                fontWeight: "bold", 
                                color: "#1f2937", 
                                marginBottom: "1rem",
                                fontFamily: "var(--font-geist-sans)"
                            }}>
                                For Administrators
                            </h3>
                            <p style={{ 
                                color: "#6b7280", 
                                lineHeight: "1.6",
                                fontFamily: "var(--font-geist-sans)"
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate metus in lacus ullamcorper, ac dignissim dui feugiat.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* about section */}
            <section id="about" style={{
                padding: "4rem 2rem",
                backgroundColor: "rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
                    <h2 style={{
                        fontSize: "clamp(2rem, 4vw, 2.5rem)",
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: "2rem",
                        fontFamily: "var(--font-geist-sans)"
                    }}>
                        Code Together with CodeCollab.
                    </h2>
                    <p style={{
                        fontSize: "1.1rem",
                        color: "rgba(255, 255, 255, 0.9)",
                        lineHeight: "1.6",
                        marginBottom: "2rem",
                        fontFamily: "var(--font-geist-sans)"
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate metus in lacus ullamcorper, ac dignissim dui feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate metus in lacus ullamcorper, ac dignissim dui feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate metus in lacus ullamcorper, ac dignissim dui feugiat.
                    </p>
                </div>
            </section>
            
            <footer style={{
                padding: "2rem",
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                color: "white"
            }}>
                <p style={{ 
                    margin: 0, 
                    opacity: 0.8,
                    fontFamily: "var(--font-geist-sans)"
                }}>
                    © 2025 CodeCollab. Lorem ipsum dolor sit amet.
                </p>
            </footer>
        </div>
    );
}