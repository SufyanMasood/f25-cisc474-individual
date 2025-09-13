"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";

interface NavItem {
    label: string;
    href?: string;
    active?: boolean;
}

interface NavbarProps {
    userType: "student" | "instructor" | "admin";
    activeItem?: string;
}

export default function Navbar({ userType, activeItem = "dashboard" }: NavbarProps) {
    const getNavItems = (): NavItem[] => {
        switch (userType) {
            case "student":
                return [
                    { label: "Dashboard", href: "/student/dashboard", active: activeItem === "dashboard" },
                    { label: "Courses", active: activeItem === "courses" },
                    { label: "Grades", active: activeItem === "grades" },
                    { label: "Profile", active: activeItem === "profile" }
                ];
            case "instructor":
                return [
                    { label: "Dashboard", href: "/instructor/dashboard", active: activeItem === "dashboard" },
                    { label: "Courses", active: activeItem === "courses" },
                    { label: "Assignments", active: activeItem === "assignments" },
                    { label: "Students", active: activeItem === "students" }
                ];
            case "admin":
                return [
                    { label: "Dashboard", href: "/admin/dashboard", active: activeItem === "dashboard" },
                    { label: "Users", active: activeItem === "users" },
                    { label: "Courses", active: activeItem === "courses" },
                    { label: "Settings", active: activeItem === "settings" }
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <div style={{
            width: "250px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRight: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "2rem 1rem"
        }}>
            {/* Logo */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #e5e7eb"
            }}>
                <span style={{ fontSize: "1.5rem" }}>💻</span>
                <h2 style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: "bold",
                    color: "#1f2937",
                    margin: 0
                }}>
                    CodeCollab
                </h2>
            </div>

            {/* Navigation. Links will be added*/}
            <nav style={{ marginBottom: "2rem" }}>
                {navItems.map((item) => (
                    <div key={item.label}>
                        {item.href ? (
                            <Link href={item.href} style={{ textDecoration: "none" }}>
                                <div style={{
                                    backgroundColor: item.active ? "#667eea" : "transparent",
                                    color: item.active ? "white" : "#6b7280",
                                    padding: "0.75rem 1rem",
                                    borderRadius: "8px",
                                    marginBottom: "0.5rem",
                                    fontSize: "0.875rem",
                                    fontWeight: item.active ? "500" : "normal",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s"
                                }}
                                onMouseOver={(e) => {
                                    if (!item.active) {
                                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!item.active) {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }
                                }}
                                >
                                    {item.label}
                                </div>
                            </Link>
                        ) : (
                            <div style={{
                                backgroundColor: item.active ? "#667eea" : "transparent",
                                color: item.active ? "white" : "#6b7280",
                                padding: "0.75rem 1rem",
                                borderRadius: "8px",
                                marginBottom: "0.5rem",
                                fontSize: "0.875rem",
                                fontWeight: item.active ? "500" : "normal",
                                cursor: "pointer",
                                transition: "background-color 0.2s"
                            }}
                            onMouseOver={(e) => {
                                if (!item.active) {
                                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!item.active) {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                }
                            }}
                            >
                                {item.label}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Logout */}
            <Link href="/" style={{ textDecoration: "none" }}>
                <Button
                    appName="web"
                    style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "#dc2626",
                        border: "1px solid #dc2626",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#dc2626";
                        e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#dc2626";
                    }}
                >
                    Logout
                </Button>
            </Link>
        </div>
    );
}