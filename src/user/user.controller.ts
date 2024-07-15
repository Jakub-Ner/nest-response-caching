import { Controller, Param, Body, Post, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserPatchDto } from './dto/user-patch-dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('one/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch('one/:id')
  async updateUsername(
    @Param('id') id: string,
    @Body() userPatchDto: UserPatchDto,
  ) {
    return this.userService.updateUsername(id, userPatchDto.newUsername);
  }

  @Get('slug/:slug')
  async findBySlack(@Param('slug') slug: string) {
    return this.userService.findBySlack(slug);
  }
}
