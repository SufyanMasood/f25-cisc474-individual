import { z } from 'zod';

// Reference DTO - Minimal info about an assignment
export const AssignmentRef = z.object({
    assignmentId: z.string(),
    title: z.string(),
})
export type AssignmentRef = z.infer<typeof AssignmentRef>;

// Output DTO - API response
export const AssignmentOut = z.object({
  assignmentId: z.string(),
  title: z.string(),
  description: z.string(),
  assignmentType: z.string(),
  maxPoints: z.number(),
  dueDateTime: z.string(),
  publishDateTime: z.string(),
  courseId: z.string(),
});
export type AssignmentOut = z.infer<typeof AssignmentOut>;

// Create DTO - API request body
export const AssignmentCreateIn = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  assignmentType: z.string().min(1, "Assignment type is required"),
  maxPoints: z.number().min(0, "Max points must be positive"),
  dueDateTime: z.string(),
  publishDateTime: z.string(),
  courseId: z.string().min(1, "Course ID is required"),
});
export type AssignmentCreateIn = z.infer<typeof AssignmentCreateIn>;

// Update DTO - API request body (everything is optional)
export const AssignmentUpdateIn = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  assignmentType: z.string().optional(),
  maxPoints: z.number().min(0).optional(),
  dueDateTime: z.string().optional(),
  publishDateTime: z.string().optional(),
  courseId: z.string().optional(),
});
export type AssignmentUpdateIn = z.infer<typeof AssignmentUpdateIn>;