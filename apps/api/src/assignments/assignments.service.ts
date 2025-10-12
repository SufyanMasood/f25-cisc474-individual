import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.assignments.findMany();
  }

  findOne(id: string) {
    return this.prisma.assignments.findUnique({
      where: { assignmentId: id },
    });
  }
}