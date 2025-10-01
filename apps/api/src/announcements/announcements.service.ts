import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.announcements.findMany();
  }

  findOne(id: string) {
    return this.prisma.announcements.findUnique({
      where: { announcementId: id },
    });
  }
}