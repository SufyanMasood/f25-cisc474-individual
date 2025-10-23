import { prisma } from "./client";

import type { Users, UserProfiles, Courses, Enrollments, Assignments, Submissions, Grades, Announcements, Authentication } from '../generated/client';

// Import all test data from json file. Test data was generated mostly by LLMs but revisions and modifications were made.
const { users, userProfiles, courses, enrollments, assignments, submissions, grades, announcements, authentications } = require('./testData.json');

(async () => {
  try {

    console.log("Seeding users...");
    await prisma.$transaction(
      users.map((user: Users) =>
        prisma.users.upsert({
          where: { email: user.email! },
          update: {
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
            userRole: user.userRole ?? "STUDENT",
          },
          create: {
            userId: user.userId!,
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.email!,
            emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
            userRole: user.userRole ?? "STUDENT",
          },
        }),
      ),
    );

    console.log("Seeding authentications...");
    if (authentications && authentications.length > 0) {
      await prisma.$transaction(
        authentications.map((auth: Authentication) =>
          prisma.authentication.upsert({
            where: {
              provider_providerId: {
                provider: auth.provider!,
                providerId: auth.providerId!,
              },
            },
            update: {},
            create: {
              id: auth.id!,
              userId: auth.userId!,
              provider: auth.provider!,
              providerId: auth.providerId!,
            },
          })
        )
      );
    }

    console.log("Seeding profiles...");
    await prisma.$transaction(
      userProfiles.map((profile: UserProfiles) =>
        prisma.userProfiles.upsert({
          where: { userId: profile.userId! },
          update: {
            avatarUrl: profile.avatarUrl,
            biography: profile.biography,
          },
          create: {
            userProfileId: profile.userProfileId!,
            userId: profile.userId!,
            avatarUrl: profile.avatarUrl,
            biography: profile.biography,
          },
        }),
      ),
    );
// 
    console.log("Seeding courses...");
    await prisma.$transaction(
      courses.map((course: Courses) =>
        prisma.courses.upsert({
         where: { courseCode: course.courseCode! },
          update: {
            courseName: course.courseName ?? "",
            description: course.description,
            instructorId: course.instructorId!,
          },
          create: {
            courseId: course.courseId!,
            courseName: course.courseName ?? "",
            courseCode: course.courseCode!,
            description: course.description,
            instructorId: course.instructorId!,
          },
        }),
      ),
    );

    console.log("Seeding enrollments...");
    await prisma.$transaction(
      enrollments.map((enrollment: Enrollments) =>
        prisma.enrollments.upsert({
          where: {
            studentId_courseId: {
              studentId: enrollment.studentId!,
              courseId: enrollment.courseId!,
            },
          },
          update: {
            // Enrollments should not be updated once created (unless deleting)
          },
          create: {
            enrollmentId: enrollment.enrollmentId!,
            studentId: enrollment.studentId!,
            courseId: enrollment.courseId!,
            enrolledDate: enrollment.enrolledDate ? new Date(enrollment.enrolledDate) : new Date(),
          },
        }),
      ),
    );

    console.log("Seeding assignments...");
    await prisma.$transaction(
      assignments.map((assignment: Assignments) =>
        prisma.assignments.upsert({
          where: { assignmentId: assignment.assignmentId! },
          update: {
            title: assignment.title ?? "",
            description: assignment.description,
            assignmentType: assignment.assignmentType ?? "Homework",
            maxPoints: assignment.maxPoints ?? 100,
            dueDateTime: assignment.dueDateTime ? new Date(assignment.dueDateTime) : new Date(),
            publishDateTime: assignment.publishDateTime ? new Date(assignment.publishDateTime) : new Date(),
          },
          create: {
            assignmentId: assignment.assignmentId!,
            title: assignment.title ?? "",
            description: assignment.description,
            assignmentType: assignment.assignmentType ?? "Homework",
            maxPoints: assignment.maxPoints ?? 100,
            dueDateTime: assignment.dueDateTime ? new Date(assignment.dueDateTime) : new Date(),
            publishDateTime: assignment.publishDateTime ? new Date(assignment.publishDateTime) : new Date(),
            courseId: assignment.courseId!,
          },
        }),
      ),
    );

    console.log("Seeding submissions...");
    await prisma.$transaction(
      submissions.map((submission: Submissions) =>
        prisma.submissions.upsert({
          where: { submissionId: submission.submissionId! },
          update: {
            submissionText: submission.submissionText ?? "",
            lastModified: submission.lastModified ? new Date(submission.lastModified) : new Date(),
            isGroupWork: submission.isGroupWork ?? false,
            collaborators: submission.collaborators,
          },
          create: {
            submissionId: submission.submissionId!,
            assignmentId: submission.assignmentId!,
            studentId: submission.studentId!,
            submissionText: submission.submissionText ?? "",
            submittedAt: submission.submittedAt ? new Date(submission.submittedAt) : new Date(),
            lastModified: submission.lastModified ? new Date(submission.lastModified) : new Date(),
            isGroupWork: submission.isGroupWork ?? false,
            collaborators: submission.collaborators,
          },
        }),
      ),
    );

    console.log("Seeding grades...");
    await prisma.$transaction(
      grades.map((grade: Grades) =>
        prisma.grades.upsert({
          where: { submissionId: grade.submissionId! }, // Unique grade for each submission
          update: {
            pointsEarned: grade.pointsEarned ?? 0,
            totalPoints: grade.totalPoints ?? 100,
            feedback: grade.feedback,
            gradedOn: grade.gradedOn ? new Date(grade.gradedOn) : new Date(),
          },
          create: {
            gradeId: grade.gradeId!,
            submissionId: grade.submissionId!,
            graderId: grade.graderId!,
            pointsEarned: grade.pointsEarned ?? 0,
            totalPoints: grade.totalPoints ?? 100,
            feedback: grade.feedback,
            gradedOn: grade.gradedOn ? new Date(grade.gradedOn) : new Date(),
          },
        }),
      ),
    );

    console.log("Seeding announcements...");
    await prisma.$transaction(
      announcements.map((announcement: Announcements) =>
        prisma.announcements.upsert({
          where: { announcementId: announcement.announcementId! },
          update: {
            subject: announcement.subject ?? "",
            message: announcement.message ?? "",
            updatedAt: announcement.updatedAt ? new Date(announcement.updatedAt) : new Date(),
          },
          create: {
            announcementId: announcement.announcementId!,
            courseId: announcement.courseId!,
            subject: announcement.subject ?? "",
            message: announcement.message ?? "",
            publishedAt: announcement.publishedAt ? new Date(announcement.publishedAt) : new Date(),
            updatedAt: announcement.updatedAt ? new Date(announcement.updatedAt) : new Date(),
          },
        }),
      ),
    )
  console.log("Seeding completed successfully!");;
  
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
