import { createFileRoute } from '@tanstack/react-router'
import Navbar from '../../../components/Navbar';
import PageHeader from '../../../components/PageHeader';
import { buttonStyles } from '../../../styles/buttonStyles';

export const Route = createFileRoute('/admin/courses/')({
    component: AdminCourses
})

interface Course {
    id: string;
    courseId: string;
    name: string;
    instructor: string;
    meetingTimes: string;
}

function AdminCourses() {

    const courses: Course[] = [
        { id: "1", courseId: "CISC474", name: "Web Application Development", instructor: "Dr. Bart", meetingTimes: "MWF 12:40-1:35" }
    ];

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontFamily: "var(--font-geist-sans)"
        }}>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <Navbar userType="admin" activeItem="courses" />

                <div style={{ flex: 1, padding: "2rem" }}>
                    <PageHeader title="Courses" userType="admin" />

                    {/* Create Course button */}
                    <div style={{
                        marginBottom: "2rem",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <button
                            style={buttonStyles.green}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = buttonStyles.greenHover.backgroundColor;
                                e.currentTarget.style.color = buttonStyles.greenHover.color;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = buttonStyles.green.backgroundColor;
                                e.currentTarget.style.color = buttonStyles.green.color;
                            }}
                        >
                            Create Course
                        </button>
                    </div>

                    <div style={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 2fr 1.5fr 1.5fr 1fr",
                            gap: "1rem",
                            padding: "1.5rem",
                            backgroundColor: "#f8fafc",
                            borderBottom: "1px solid #e2e8f0",
                            fontWeight: "700",
                            fontSize: "1rem",
                            color: "#374151"
                        }}>
                            <div>Course ID</div>
                            <div>Course Name</div>
                            <div>Instructor</div>
                            <div>Meeting Times</div>
                            <div>Actions</div>
                        </div>

                        {/* Create rows in table */}
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 2fr 1.5fr 1.5fr 1fr",
                                    gap: "1rem",
                                    padding: "1.5rem",
                                    borderBottom: "1px solid #e2e8f0",
                                    transition: "background-color 0.2s",
                                    cursor: "pointer"
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                                <div style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <span style={{
                                        fontSize: "0.9rem",
                                        fontWeight: "700",
                                        color: "#6366f1",
                                        backgroundColor: "#e0e7ff",
                                        padding: "0.375rem 0.75rem",
                                        borderRadius: "8px",
                                        textAlign: "center"
                                    }}>
                                        {course.courseId}
                                    </span>
                                </div>

                                <div>
                                    <div style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "700",
                                        color: "#111827",
                                        marginBottom: "0.375rem",
                                        lineHeight: "1.4"
                                    }}>
                                        {course.name}
                                    </div>
                                </div>

                                <div style={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    color: "#374151",
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    {course.instructor}
                                </div>

                                <div style={{
                                    fontSize: "1rem",
                                    color: "#6b7280",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    {course.meetingTimes}
                                </div>

                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    <button
                                        style={buttonStyles.primary}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = buttonStyles.primaryHover.backgroundColor;
                                            e.currentTarget.style.color = buttonStyles.primaryHover.color;
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = buttonStyles.primary.backgroundColor;
                                            e.currentTarget.style.color = buttonStyles.primary.color;
                                        }}
                                    >
                                        View
                                    </button>
                                    <button
                                        style={buttonStyles.primary}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = buttonStyles.primaryHover.backgroundColor;
                                            e.currentTarget.style.color = buttonStyles.primaryHover.color;
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = buttonStyles.primary.backgroundColor;
                                            e.currentTarget.style.color = buttonStyles.primary.color;
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}

                        {courses.length === 0 && (
                            <div style={{
                                padding: "3rem",
                                textAlign: "center",
                                color: "#6b7280"
                            }}>
                                <p style={{ margin: 0, fontSize: "1.1rem" }}>
                                    No courses found.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}