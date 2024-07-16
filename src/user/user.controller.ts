import { Controller, Param, Body, Post, Get, Patch, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserPatchDto } from './dto/user-patch-dto';
import { ClearCacheInterceptor } from 'src/clear-cache.interceptor';
import { CLEAR_CACHE_KEY, ClearCache } from 'src/clear-cache.decorator';

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
  @UseInterceptors(ClearCacheInterceptor) // link interceptor with enpoint
  @ClearCache(['/user'])  
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
