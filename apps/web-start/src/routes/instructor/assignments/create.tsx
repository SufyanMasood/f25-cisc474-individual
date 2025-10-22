import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AssignmentCreateIn } from '@repo/api/assignments'
import Navbar from '../../../components/Navbar'
import PageHeader from '../../../components/PageHeader'
import { buttonStyles } from '../../../styles/buttonStyles'
import { layoutStyles } from '../../../styles/layoutStyles'
import { formStyles } from '../../../styles/formStyles'

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
    <div style={layoutStyles.pageBackground}>
      <div style={layoutStyles.pageContainer}>
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
              <div style={formStyles.successMessage}>
                Creating assignment...
              </div>
            )}

            {createMutation.isError && (
              <div style={formStyles.errorMessage}>
                Error: {(createMutation.error as Error).message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={formStyles.input}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  style={formStyles.textarea}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>Assignment Type *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Project, Homework, CollabCode"
                  value={formData.assignmentType}
                  onChange={(e) => setFormData({ ...formData, assignmentType: e.target.value })}
                  style={formStyles.input}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>Max Points *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.maxPoints}
                  onChange={(e) => setFormData({ ...formData, maxPoints: Number(e.target.value) })}
                  style={formStyles.input}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>Course ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., course001"
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  style={formStyles.input}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>
                  Due Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.dueDateTime}
                  onChange={(e) => setFormData({ ...formData, dueDateTime: e.target.value })}
                  style={formStyles.input}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>
                  Publish Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.publishDateTime}
                  onChange={(e) => setFormData({ ...formData, publishDateTime: e.target.value })}
                  style={formStyles.input}
                />
              </div>

              <div style={formStyles.buttonContainer}>
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