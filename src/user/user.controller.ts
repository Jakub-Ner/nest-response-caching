import { Controller, Param, Body, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post(':id')
  async updateUsername(
    @Param('id') id: string,
    @Body('newUsername') newUsername: string,
  ) {
    return this.userService.updateUsername(id, newUsername);
  }

  @Get(':slack')
  async findBySlack(@Param('slack') slack: string) {
    return this.userService.findBySlack(slack);
  }
}
