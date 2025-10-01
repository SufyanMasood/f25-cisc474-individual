import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursessService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursessService.findOne(id);
  }
}