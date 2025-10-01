import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.grades.findMany();
  }

  findOne(id: string) {
    return this.prisma.grades.findUnique({
      where: { gradeId: id },
    });
  }
}