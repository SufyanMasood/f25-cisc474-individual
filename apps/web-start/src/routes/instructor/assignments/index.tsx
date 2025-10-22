import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import Navbar from '../../../components/Navbar'
import PageHeader from '../../../components/PageHeader'
import { backendFetcher } from '../../../integrations/fetcher'
import { buttonStyles } from '../../../styles/buttonStyles'
import { layoutStyles } from '../../../styles/layoutStyles'

export const Route = createFileRoute('/instructor/assignments/')({
    component: InstructorAssignments
})

interface Course {
    courseId: string;
    courseName: string;
    courseCode: string;
    description: string;
    instructorId: string;
}

interface Assignment {
    assignmentId: string;
    title: string;
    description: string;
    assignmentType: string;
    maxPoints: number;
    dueDateTime: string;
    publishDateTime: string;
    courseId: string;
}

function AssignmentsContent() {
    const { data: courses = [], isLoading: coursesLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: backendFetcher<Course[]>('/courses')
    });

    const { data: assignments = [], isLoading: assignmentsLoading, error } = useQuery({
        queryKey: ['assignments'],
        queryFn: backendFetcher<Assignment[]>('/assignments')
    });

    if (coursesLoading || assignmentsLoading) {
        return (
            <div style={{
                padding: "2rem",
                textAlign: "center",
                color: "#6b7280"
            }}>
                Loading assignments...
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
                Error loading assignments: {(error as Error).message}
            </div>
        );
    }

    const courseMap: Record<string, string> = {};
    courses.forEach((course) => {
        courseMap[course.courseId] = course.courseName;
    });

    const groupedAssignments: Record<string, Assignment[]> = {};

    assignments.forEach((assignment) => {
        const dateString: string = new Date(assignment.dueDateTime).toISOString().split('T')[0] as string;

        if (!groupedAssignments[dateString]) {
            groupedAssignments[dateString] = [];
        }
        groupedAssignments[dateString].push(assignment);
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric"
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div>
            {Object.entries(groupedAssignments)
                .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                .map(([date, assignmentsForDate]) => (
                    <div key={date} style={{ marginBottom: "2rem" }}>
                        <h2 style={{
                            fontSize: "1.25rem",
                            fontWeight: "700",
                            color: "#1f2937",
                            margin: 0,
                            marginBottom: "1.25rem",
                            paddingBottom: "0.75rem",
                            borderBottom: "2px solid #e5e7eb"
                        }}>
                            {formatDate(date)}
                        </h2>

                        <div>
                            {assignmentsForDate.map((assignment) => (
                                <div
                                    key={assignment.assignmentId}
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "12px",
                                        padding: "1.75rem",
                                        marginBottom: "1.25rem",
                                        transition: "all 0.2s",
                                        cursor: "pointer",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)"
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = "#f8fafc";
                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.12)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.08)";
                                    }}
                                >
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start"
                                    }}>
                                        <div style={{ flex: "0 0 250px" }}>
                                            <span style={{
                                                fontSize: "0.85rem",
                                                fontWeight: "600",
                                                color: "#6366f1",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.05em"
                                            }}>
                                                {courseMap[assignment.courseId] || assignment.courseId}
                                            </span>
                                            <h3 style={{
                                                fontSize: "1.05rem",
                                                fontWeight: "600",
                                                color: "#374151",
                                                margin: 0,
                                                marginTop: "0.375rem",
                                                lineHeight: "1.4"
                                            }}>
                                                {assignment.assignmentType}
                                            </h3>
                                        </div>

                                        <div style={{ flex: 1, padding: "0 1rem" }}>
                                            <h2 style={{
                                                fontSize: "1.2rem",
                                                fontWeight: "700",
                                                color: "#111827",
                                                margin: 0,
                                                lineHeight: "1.5",
                                                marginBottom: "0.5rem"
                                            }}>
                                                {assignment.title}
                                            </h2>

                                            <p style={{
                                                fontSize: "0.875rem",
                                                color: "#6b7280",
                                                margin: 0,
                                                marginBottom: "0.75rem",
                                                lineHeight: "1.4"
                                            }}>
                                                {assignment.description}
                                            </p>

                                            <div style={{
                                                display: "flex",
                                                gap: "1rem",
                                                fontSize: "0.75rem",
                                                color: "#9ca3af"
                                            }}>
                                                <span>
                                                    <strong>Max Points:</strong> {assignment.maxPoints}
                                                </span>
                                                <span>
                                                    <strong>Published:</strong> {formatDate(assignment.publishDateTime)} at {formatTime(assignment.publishDateTime)}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ flex: "0 0 auto", textAlign: "right" }}>
                                            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
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
                                                <Link to="/instructor/assignments/$assignmentId/manage" params={{ assignmentId: assignment.assignmentId }}>
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
                                                </Link>
                                            </div>
                                            <p style={{
                                                fontSize: "0.9rem",
                                                color: "#6b7280",
                                                margin: 0,
                                                fontWeight: "500"
                                            }}>
                                                Due: {formatTime(assignment.dueDateTime)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            {Object.keys(groupedAssignments).length === 0 && (
                <div style={{
                    padding: "3rem",
                    textAlign: "center",
                    color: "#6b7280"
                }}>
                    <p style={{ margin: 0, fontSize: "1.1rem" }}>
                        No assignments found.
                    </p>
                </div>
            )}
        </div>
    );
}

function InstructorAssignments() {
    return (
        <div style={layoutStyles.pageBackground}>
        <div style={layoutStyles.pageContainer}>
                <Navbar userType="instructor" activeItem="assignments" />

                <div style={{ flex: 1, padding: "2rem" }}>
                    <PageHeader title="Assignments" userType="instructor" />

                    <div style={{
                        marginBottom: "2rem",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Link to="/instructor/assignments/create">
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
                                Create Assignment
                            </button>
                        </Link>
                    </div>

                    <div style={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        padding: "1.5rem"
                    }}>
                        <Suspense fallback={
                            <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
                                Loading assignments...
                            </div>
                        }>
                            <AssignmentsContent />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}