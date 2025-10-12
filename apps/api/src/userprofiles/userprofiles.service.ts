import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserProfilesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.userProfiles.findMany();
  }

  findOne(id: string) {
    return this.prisma.userProfiles.findUnique({
      where: { userProfileId: id },
    });
  }
}