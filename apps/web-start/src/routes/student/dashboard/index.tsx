import { createFileRoute } from '@tanstack/react-router'
import Navbar from '../../../components/Navbar'
import PageHeader from '../../../components/PageHeader'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { backendFetcher } from '../../../integrations/fetcher'

export const Route = createFileRoute('/student/dashboard/')({
  component: StudentDashboard
})

interface Course {
    courseId: string;
    courseName: string;
    courseCode: string;
    description: string;
    instructorId: string;
}

function CoursesContent() {
    const { data: courses = [], isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: backendFetcher<Course[]>('/courses')
    });

    if (isLoading) {
        return (
            <div style={{
                padding: "2rem",
                textAlign: "center",
                color: "#6b7280"
            }}>
                Loading courses...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                padding: "2rem",
                textAlign: "center",
                color: "#dc2626"
            }}>
                Error loading courses: {(error as Error).message}
            </div>
        );
    }

    return (
        <div>
            {courses.map((course: Course) => (
                <div key={course.courseId} style={{
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
                                {course.courseName}
                            </h3>
                            <p style={{
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                margin: 0,
                                marginBottom: "0.25rem"
                            }}>
                                Course Code: {course.courseCode}
                            </p>
                            <p style={{
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                margin: 0,
                                marginBottom: "0.25rem"
                            }}>
                                Instructor: {course.instructorId}
                            </p>
                            <p style={{
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                margin: 0
                            }}>
                                {course.description}
                            </p>
                        </div>
                        <span style={{
                            backgroundColor: "#dcfce7",
                            color: "#166534",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: "500"
                        }}>
                            Enrolled
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

function StudentDashboard() {
    return (
        <div style={{ 
            minHeight: "100vh", 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontFamily: "var(--font-geist-sans)"
        }}>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <Navbar userType="student" activeItem="dashboard" />

                <div style={{ flex: 1, padding: "2rem" }}>
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
                            <Suspense fallback={
                                <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
                                    Loading courses...
                                </div>
                            }>
                                <CoursesContent />
                            </Suspense>
                        </div>

                        {/* Grades - Need to implement connection to /grades endpoint  */}
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
                                <p style={{
                                    color: "#6b7280",
                                    textAlign: "center",
                                    padding: "1rem 0",
                                    margin: 0
                                }}>
                                    No grades posted yet
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.5rem"
                    }}>
                        {/* Profile - Need to implement connection to /userprofiles endpoint*/}
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
                                <button
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
                                </button>
                            </div>
                        </div>

                        {/* Notifications - Need to implement connection to /announcements endpoint */}
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
                                <p style={{
                                    color: "#6b7280",
                                    textAlign: "center",
                                    padding: "2rem 0",
                                    margin: 0,
                                    fontSize: "0.875rem"
                                }}>
                                    No new notifications
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}