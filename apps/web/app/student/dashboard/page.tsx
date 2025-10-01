"use client";

import React from "react";
import { Button } from "@repo/ui/button";
import Navbar from "../../../components/Navbar";
import PageHeader from "../../../components/PageHeader";

interface Course {
    id: string;
    courseId: string;
    name: string;
    instructor: string;
    credits: number;
    grade?: string;
    numericalGrade?: number;
}

interface Notification {
    id: string;
    message: string;
    date: string;
    type: "info" | "warning" | "success";
}

export default function StudentDashboard() {
    const courses: Course[] = [
        { id: "1", courseId: "CISC474", name: "Web Application Development", instructor: "Dr. Bart", credits: 3, grade: "A", numericalGrade: 94.2 }
    ];

    const grades = courses.filter(course => course.grade);

    const notifications: Notification[] = [];

    return (
        <div style={{ 
            minHeight: "100vh", 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontFamily: "var(--font-geist-sans)"
        }}>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                {/* Get Navbar component */}
                <Navbar userType="student" activeItem="dashboard" />

                <div style={{ flex: 1, padding: "2rem" }}>
                    {/* Get PageHeader component */}
                    <PageHeader title="Dashboard" userType="student" />

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.5rem",
                        marginBottom: "1.5rem"
                    }}>
                        {/* Courses */}
                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}>
                            <h2 style={{
                                fontSize: "1.25rem",
                                fontWeight: "600",
                                color: "#1f2937",
                                margin: 0,
                                marginBottom: "1rem"
                            }}>
                                My Courses
                            </h2>
                            <div>
                                {courses.map((course) => (
                                    <div key={course.id} style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        padding: "0.75rem",
                                        marginBottom: "0.75rem",
                                        transition: "background-color 0.2s",
                                        cursor: "pointer"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                    >
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "start"
                                        }}>
                                            <div>
                                                <h3 style={{
                                                    fontSize: "0.875rem",
                                                    fontWeight: "500",
                                                    color: "#1f2937",
                                                    margin: 0,
                                                    marginBottom: "0.25rem"
                                                }}>
                                                    {course.name}
                                                </h3>
                                                <p style={{
                                                    fontSize: "0.75rem",
                                                    color: "#6b7280",
                                                    margin: 0,
                                                    marginBottom: "0.25rem"
                                                }}>
                                                    Course ID: {course.courseId}
                                                </p>
                                                <p style={{
                                                    fontSize: "0.75rem",
                                                    color: "#6b7280",
                                                    margin: 0,
                                                    marginBottom: "0.25rem"
                                                }}>
                                                    Instructor: {course.instructor}
                                                </p>
                                                <p style={{
                                                    fontSize: "0.75rem",
                                                    color: "#6b7280",
                                                    margin: 0
                                                }}>
                                                    Credits: {course.credits}
                                                </p>
                                            </div>
                                            {course.grade && (
                                                <span style={{
                                                    backgroundColor: "#dcfce7",
                                                    color: "#166534",
                                                    padding: "0.25rem 0.5rem",
                                                    borderRadius: "12px",
                                                    fontSize: "0.75rem",
                                                    fontWeight: "500"
                                                }}>
                                                    {course.grade}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grades */}
                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}>
                            <h2 style={{
                                fontSize: "1.25rem",
                                fontWeight: "600",
                                color: "#1f2937",
                                margin: 0,
                                marginBottom: "1rem"
                            }}>
                                My Grades
                            </h2>
                            <div>
                                {grades.map((course) => (
                                    <div key={course.id} style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "0.75rem 0",
                                        borderBottom: "1px solid #e5e7eb"
                                    }}>
                                        <div>
                                            <p style={{
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                                color: "#1f2937",
                                                margin: 0,
                                                marginBottom: "0.25rem"
                                            }}>
                                                {course.name}
                                            </p>
                                            <p style={{
                                                fontSize: "0.75rem",
                                                color: "#6b7280",
                                                margin: 0
                                            }}>
                                                {course.credits} credits
                                            </p>
                                        </div>
                                        <span style={{
                                            fontSize: "1.125rem",
                                            fontWeight: "600",
                                            color: "#2563eb"
                                        }}>
                                            {course.numericalGrade}
                                        </span>
                                    </div>
                                ))}
                                {grades.length === 0 && (
                                    <p style={{
                                        color: "#6b7280",
                                        textAlign: "center",
                                        padding: "1rem 0",
                                        margin: 0
                                    }}>
                                        No grades posted yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.5rem"
                    }}>
                        {/* Profile */}
                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}>
                            <h2 style={{
                                fontSize: "1.25rem",
                                fontWeight: "600",
                                color: "#1f2937",
                                margin: 0,
                                marginBottom: "1rem"
                            }}>
                               My Profile
                            </h2>
                            <div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{
                                        display: "block",
                                        fontSize: "0.75rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                        marginBottom: "0.25rem"
                                    }}>
                                        Student ID
                                    </label>
                                    <p style={{
                                        fontSize: "0.875rem",
                                        color: "#1f2937",
                                        margin: 0
                                    }}>
                                        123456
                                    </p>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{
                                        display: "block",
                                        fontSize: "0.75rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                        marginBottom: "0.25rem"
                                    }}>
                                        Email
                                    </label>
                                    <p style={{
                                        fontSize: "0.875rem",
                                        color: "#1f2937",
                                        margin: 0
                                    }}>
                                        Sufyanm@udel.edu
                                    </p>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{
                                        display: "block",
                                        fontSize: "0.75rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                        marginBottom: "0.25rem"
                                    }}>
                                        Major
                                    </label>
                                    <p style={{
                                        fontSize: "0.875rem",
                                        color: "#1f2937",
                                        margin: 0
                                    }}>
                                        Computer Science
                                    </p>
                                </div>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{
                                        display: "block",
                                        fontSize: "0.75rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                        marginBottom: "0.25rem"
                                    }}>
                                        Year
                                    </label>
                                    <p style={{
                                        fontSize: "0.875rem",
                                        color: "#1f2937",
                                        margin: 0
                                    }}>
                                        Senior
                                    </p>
                                </div>
                                <Button
                                    appName="web"
                                    style={{
                                        backgroundColor: "#667eea",
                                        color: "white",
                                        border: "none",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "6px",
                                        fontSize: "0.75rem",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        marginTop: "0.5rem"
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}>
                            <h2 style={{
                                fontSize: "1.25rem",
                                fontWeight: "600",
                                color: "#1f2937",
                                margin: 0,
                                marginBottom: "1rem"
                            }}>
                                My Notifications
                            </h2>
                            <div>
                                {notifications.length === 0 ? (
                                    <p style={{
                                        color: "#6b7280",
                                        textAlign: "center",
                                        padding: "2rem 0",
                                        margin: 0,
                                        fontSize: "0.875rem"
                                    }}>
                                        No new notifications
                                    </p>
                                ) : (
                                    notifications.map((notification) => (
                                        <div key={notification.id} style={{
                                            borderLeft: "4px solid",
                                            borderLeftColor: notification.type === "warning" ? "#fbbf24" : notification.type === "success" ? "#10b981" : "#3b82f6",
                                            backgroundColor: notification.type === "warning" ? "#fefce8" : notification.type === "success" ? "#ecfdf5" : "#eff6ff",
                                            padding: "0.75rem",
                                            marginBottom: "0.75rem",
                                            borderTopRightRadius: "6px",
                                            borderBottomRightRadius: "6px"
                                        }}>
                                            <p style={{
                                                fontSize: "0.75rem",
                                                color: "#1f2937",
                                                margin: 0,
                                                marginBottom: "0.25rem"
                                            }}>
                                                {notification.message}
                                            </p>
                                            <p style={{
                                                fontSize: "0.625rem",
                                                color: "#6b7280",
                                                margin: 0
                                            }}>
                                                {notification.date}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}