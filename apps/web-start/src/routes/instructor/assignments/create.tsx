import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AssignmentCreateIn } from '@repo/api/assignments';
import Navbar from '../../../components/Navbar';
import PageHeader from '../../../components/PageHeader';
import { buttonStyles } from '../../../styles/buttonStyles';

export const Route = createFileRoute('/instructor/assignments/create')({
  component: CreateAssignment,
})

function CreateAssignment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<AssignmentCreateIn>({
    title: '',
    description: '',
    assignmentType: '',
    maxPoints: 0,
    dueDateTime: '',
    publishDateTime: '',
    courseId: '',
  });

  const createMutation = useMutation({
    mutationFn: async (data: AssignmentCreateIn) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create assignment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      navigate({ to: '/instructor/assignments' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
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
          <PageHeader title="Create Assignment" userType="instructor" />

          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "2rem",
          }}>
            {createMutation.isPending && (
              <div style={{
                padding: "1rem",
                backgroundColor: "#eff6ff",
                borderRadius: "8px",
                marginBottom: "1rem",
                color: "#1e40af"
              }}>
                Creating assignment...
              </div>
            )}

            {createMutation.isError && (
              <div style={{
                padding: "1rem",
                backgroundColor: "#fee",
                borderRadius: "8px",
                marginBottom: "1rem",
                color: "#dc2626"
              }}>
                Error: {(createMutation.error as Error).message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.875rem"
                }}>
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.875rem"
                }}>
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.875rem"
                }}>
                  Assignment Type *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Project, Homework, CollabCode"
                  value={formData.assignmentType}
                  onChange={(e) => setFormData({ ...formData, assignmentType: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.875rem"
                }}>
                  Max Points *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.maxPoints}
                  onChange={(e) => setFormData({ ...formData, maxPoints: Number(e.target.value) })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.875rem"
                }}>
                  Course ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., course001"
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.875rem"
                }}>
                  Due Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.dueDateTime}
                  onChange={(e) => setFormData({ ...formData, dueDateTime: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                  fontSize: "0.875rem"
                }}>
                  Publish Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.publishDateTime}
                  onChange={(e) => setFormData({ ...formData, publishDateTime: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <Link to="/instructor/assignments">
                  <button
                    type="button"
                    style={buttonStyles.secondary}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = buttonStyles.secondaryHover.backgroundColor;
                      e.currentTarget.style.color = buttonStyles.secondaryHover.color;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = buttonStyles.secondary.backgroundColor;
                      e.currentTarget.style.color = buttonStyles.secondary.color;
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
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
                  {createMutation.isPending ? 'Creating...' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
