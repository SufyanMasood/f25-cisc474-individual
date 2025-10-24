import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { AssignmentUpdateIn } from '@repo/api/assignments'
import Navbar from '../../../components/Navbar'
import PageHeader from '../../../components/PageHeader'
import { buttonStyles } from '../../../styles/buttonStyles'
import { layoutStyles } from '../../../styles/layoutStyles'
import { formStyles } from '../../../styles/formStyles'
import { useApiQuery, useApiMutation } from '../../../integrations/api'

export const Route = createFileRoute(
  '/instructor/assignments/$assignmentId/manage',
)({
  component: ManageAssignment,
})

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

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentTitle: string;
  onConfirm: () => void;
  isDeleting: boolean;
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, isDeleting }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
      }}>
        <h2 style={{
          margin: 0,
          marginBottom: '1rem',
          color: 'black',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          Confirm to delete the selected assignment
        </h2>

        <p style={{
          margin: 0,
          marginBottom: '.25rem',
          color: '#374151',
          fontSize: '0.875rem'
        }}>
          Are you sure you want to delete this assignment?
        </p>

        <p style={{
          margin: 0,
          marginBottom: '.5rem',
          color: '#374151',
          fontSize: '0.875rem'
        }}>
          This action cannot be undone.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
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
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            style={buttonStyles.danger}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = buttonStyles.dangerHover.backgroundColor;
              e.currentTarget.style.color = buttonStyles.dangerHover.color;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = buttonStyles.danger.backgroundColor;
              e.currentTarget.style.color = buttonStyles.danger.color;
            }}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ManageAssignment() {
  const { assignmentId } = Route.useParams();
  const navigate = useNavigate();

  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch the existing assignment
  const { data: assignment, isLoading, error } = useApiQuery<Assignment>(
    ['assignment', assignmentId],
    `/assignments/${assignmentId}`
  );

  const [formData, setFormData] = useState<AssignmentUpdateIn>({
    title: '',
    description: '',
    assignmentType: '',
    maxPoints: 0,
    dueDateTime: '',
    publishDateTime: '',
    courseId: '',
  });

  // Pre-fill the form when assignment data loads
  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title,
        description: assignment.description,
        assignmentType: assignment.assignmentType,
        maxPoints: assignment.maxPoints,
        dueDateTime: assignment.dueDateTime.slice(0, 16), // Format for datetime
        publishDateTime: assignment.publishDateTime.slice(0, 16),
        courseId: assignment.courseId,
      });
    }
  }, [assignment]);

  const updateMutation = useApiMutation<AssignmentUpdateIn>({
    endpoint: () => ({ path: `/assignments/${assignmentId}`, method: 'PATCH' }),
    invalidateKeys: [['assignments'], ['assignment', assignmentId]],
  });
  // Redirect on success
  if (updateMutation.isSuccess) {
    navigate({ to: '/instructor/assignments' });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const deleteMutation = useApiMutation({
    endpoint: () => ({ path: `/assignments/${assignmentId}`, method: 'DELETE' }),
    invalidateKeys: [['assignments']],
  });

  // Redirect after delete
  if (deleteMutation.isSuccess) {
    window.location.href = '/instructor/assignments';
  }
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteMutation.mutate({});
  };

  if (isLoading) {
    return (
      <div style={layoutStyles.centerMessage}>
        Loading assignment...
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div style={layoutStyles.centerMessage}>
        Error loading assignment: {error?.message || 'Assignment not found'}
      </div>
    );
  }

  return (
    <div style={layoutStyles.pageBackground}>
      <div style={layoutStyles.pageContainer}>
        <Navbar userType="instructor" activeItem="assignments" />

        <div style={{ flex: 1, padding: "2rem" }}>
          <PageHeader title="Edit Assignment" userType="instructor" />

          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "2rem"
          }}>
            {updateMutation.isPending && (
              <div style={formStyles.successMessage}>
                Updating assignment...
              </div>
            )}

            {updateMutation.isError && (
              <div style={formStyles.errorMessage}>
                Error: {(updateMutation.error as Error).message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={formStyles.input}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  style={formStyles.textarea}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>
                  Assignment Type *
                </label>
                <input
                  type="text"
                  required
                  value={formData.assignmentType}
                  onChange={(e) => setFormData({ ...formData, assignmentType: e.target.value })}
                  style={formStyles.input}
                />
              </div>

              <div style={formStyles.fieldWrapper}>
                <label style={formStyles.label}>
                  Max Points *
                </label>
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
                <label style={formStyles.label}>
                  Course ID *
                </label>
                <input
                  type="text"
                  required
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
                  {<button
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
                  </button>}
                </Link>
                <button
                  onClick={handleDeleteClick}
                  type="button"
                  style={buttonStyles.danger}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = buttonStyles.dangerHover.backgroundColor;
                    e.currentTarget.style.color = buttonStyles.dangerHover.color;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = buttonStyles.danger.backgroundColor;
                    e.currentTarget.style.color = buttonStyles.danger.color;
                  }}
                >
                  Delete Assignment
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
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
                  {updateMutation.isPending ? 'Updating...' : 'Update Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={DeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        assignmentTitle={assignment?.title || ''}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}