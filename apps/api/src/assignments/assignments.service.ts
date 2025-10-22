import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AssignmentCreateIn, AssignmentUpdateIn } from '@repo/api/assignments';
import { v4 as uuidv4 } from 'uuid';

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

async create(createDto: AssignmentCreateIn) {

    const assignmentId = uuidv4(); // Generate a new UUID for the assignment
    
    return this.prisma.assignments.create({
      data: {
        assignmentId,
        title: createDto.title,
        description: createDto.description,
        assignmentType: createDto.assignmentType,
        maxPoints: createDto.maxPoints,
        dueDateTime: new Date(createDto.dueDateTime),
        publishDateTime: new Date(createDto.publishDateTime),
        courseId: createDto.courseId,
      },
    });
  }

  async update(id: string, updateDto: AssignmentUpdateIn) {
    
    const updateData: any = {}; // Create an object to hold the fields to update
    
    if (updateDto.title !== undefined) updateData.title = updateDto.title;
    if (updateDto.description !== undefined) updateData.description = updateDto.description;
    if (updateDto.assignmentType !== undefined) updateData.assignmentType = updateDto.assignmentType;
    if (updateDto.maxPoints !== undefined) updateData.maxPoints = updateDto.maxPoints;
    if (updateDto.dueDateTime !== undefined) updateData.dueDateTime = new Date(updateDto.dueDateTime);
    if (updateDto.publishDateTime !== undefined) updateData.publishDateTime = new Date(updateDto.publishDateTime);
    if (updateDto.courseId !== undefined) updateData.courseId = updateDto.courseId;

    return this.prisma.assignments.update({
      where: { assignmentId: id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.assignments.delete({
      where: { assignmentId: id },
    });
  }
}