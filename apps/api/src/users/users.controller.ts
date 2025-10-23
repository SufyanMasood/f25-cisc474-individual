import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { JwtUser } from 'src/auth/jwt.strategy'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@CurrentUser() user: JwtUser) {
    return this.usersService.findOne(user.userId);
  }
}