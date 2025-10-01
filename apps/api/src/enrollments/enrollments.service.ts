import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.enrollments.findMany();
  }

  findOne(id: string) {
    return this.prisma.enrollments.findUnique({
      where: { enrollmentId: id },
    });
  }
}