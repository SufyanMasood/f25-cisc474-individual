import { Module } from '@nestjs/common';
import { UserProfilesService } from './userprofiles.service';
import { UserProfilesController } from './userprofiles.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UserProfilesController],
  providers: [UserProfilesService, PrismaService],
})
export class UserProfilesModule {}