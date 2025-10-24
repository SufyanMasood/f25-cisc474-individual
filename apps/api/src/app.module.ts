import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './users/users.module';
import { UserProfilesModule } from './userprofiles/userprofiles.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { GradesModule } from './grades/grades.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LinksModule, UsersModule, UserProfilesModule, AnnouncementsModule, AssignmentsModule, CoursesModule, EnrollmentsModule, GradesModule, SubmissionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
