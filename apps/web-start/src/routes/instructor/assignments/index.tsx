import { createFileRoute } from '@tanstack/react-router'

import Navbar from '../../../components/Navbar';
import PageHeader from '../../../components/PageHeader';

export const Route = createFileRoute('/instructor/assignments/')({
  component: InstructorAssignments
})

interface Assignment {
    id: string;
    courseId: string;
    courseName: string;
    assignmentName: string;
    dueDate: string;
    dueTime: string;
}

function InstructorAssignments() {
    
    const assignments: Assignment[] = [
        { id: "1", courseId: "CISC474", courseName: "Web Application Development", assignmentName: "Learning NextJS", dueDate: "2025-09-12", dueTime: "11:59 PM"}
    ];

    // Group assignments by due date
    const groupedAssignments = assignments.reduce((groups, assignment) => {
        const date = assignment.dueDate;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(assignment);
        return groups;
    }, {} as Record<string, Assignment[]>);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric"
        });
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontFamily: "var(--font-geist-sans)"
        }}>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <Navbar userType="instructor" activeItem="assignments" />

                <div style={{ flex: 1, padding: "2rem" }}>
                    <PageHeader title="Assignments" userType="instructor" />

                     {/* Create Assignment Button */}
                    <div style={{ 
                        marginBottom: "2rem",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <button
                            style={{
                                backgroundColor: "white",
                                color: "#374151",
                                border: "2px solid #374151",
                                padding: "0.75rem 1.5rem",
                                borderRadius: "12px",
                                fontSize: "0.875rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontFamily: "var(--font-geist-sans)"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#374151";
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "white";
                                e.currentTarget.style.color = "#374151";
                            }}
                        >
                            Create Assignment
                        </button>
                    </div>

                    <div style={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        padding: "1.5rem"
                    }}>
                        {/* Render grouped assignments */}
                        {Object.entries(groupedAssignments)
                            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                            .map(([date, assignmentsForDate]) => (
                            <div key={date} style={{ marginBottom: "2rem" }}>
                                {/* Date */}
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
                                
                                {/* List assignments */}
                                <div>
                                    {assignmentsForDate.map((assignment) => (
                                        <div
                                            key={assignment.id}
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
                                                alignItems: "center"
                                            }}>
                                                {/* CourseID and name */}
                                                <div style={{ flex: "0 0 250px" }}>
                                                    <span style={{
                                                        fontSize: "0.85rem",
                                                        fontWeight: "600",
                                                        color: "#6366f1",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.05em"
                                                    }}>
                                                        {assignment.courseId}
                                                    </span>
                                                    <h3 style={{
                                                        fontSize: "1.05rem",
                                                        fontWeight: "600",
                                                        color: "#374151",
                                                        margin: 0,
                                                        marginTop: "0.375rem",
                                                        lineHeight: "1.4"
                                                    }}>
                                                        {assignment.courseName}
                                                    </h3>
                                                </div>

                                                {/* Assignment name */}
                                                <div style={{ flex: 1, textAlign: "center", padding: "0 1rem" }}>
                                                    <h2 style={{
                                                        fontSize: "1.2rem",
                                                        fontWeight: "700",
                                                        color: "#111827",
                                                        margin: 0,
                                                        lineHeight: "1.5"
                                                    }}>
                                                        {assignment.assignmentName}
                                                    </h2>
                                                </div>

                                                {/* Due date and action buttons */}
                                                <div style={{ flex: "0 0 auto", textAlign: "right" }}>
                                                    <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
                                                        <button
                                                            style={{
                                                                backgroundColor: "transparent",
                                                                color: "#059669",
                                                                border: "1.5px solid #059669",
                                                                padding: "0.625rem 1rem",
                                                                borderRadius: "8px",
                                                                fontSize: "0.85rem",
                                                                fontWeight: "600",
                                                                cursor: "pointer",
                                                                transition: "all 0.2s",
                                                                fontFamily: "var(--font-geist-sans)"
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.backgroundColor = "#059669";
                                                                e.currentTarget.style.color = "white";
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.backgroundColor = "transparent";
                                                                e.currentTarget.style.color = "#059669";
                                                            }}
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            style={{
                                                                backgroundColor: "transparent",
                                                                color: "#667eea",
                                                                border: "1.5px solid #667eea",
                                                                padding: "0.625rem 1rem",
                                                                borderRadius: "8px",
                                                                fontSize: "0.85rem",
                                                                fontWeight: "600",
                                                                cursor: "pointer",
                                                                transition: "all 0.2s",
                                                                fontFamily: "var(--font-geist-sans)"
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
                                                            Edit
                                                        </button>
                                                        <button
                                                            style={{
                                                                backgroundColor: "transparent",
                                                                color: "#dc2626",
                                                                border: "1.5px solid #dc2626",
                                                                padding: "0.625rem 1rem",
                                                                borderRadius: "8px",
                                                                fontSize: "0.85rem",
                                                                fontWeight: "600",
                                                                cursor: "pointer",
                                                                transition: "all 0.2s",
                                                                fontFamily: "var(--font-geist-sans)"
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
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <p style={{
                                                        fontSize: "0.9rem",
                                                        color: "#6b7280",
                                                        margin: 0,
                                                        fontWeight: "500"
                                                    }}>
                                                        Due: {assignment.dueTime}
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
                </div>
            </div>
        </div>
    );
}