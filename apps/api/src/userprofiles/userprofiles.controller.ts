import { Controller, Get, Param } from '@nestjs/common';
import { UserProfilesService } from './userprofiles.service';

@Controller('userprofiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Get()
  findAll() {
    return this.userProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfilesService.findOne(id);
  }
}