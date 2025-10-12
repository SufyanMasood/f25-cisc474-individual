import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.courses.findMany();
  }

  findOne(id: string) {
    return this.prisma.courses.findUnique({
      where: { courseId: id },
    });
  }
}