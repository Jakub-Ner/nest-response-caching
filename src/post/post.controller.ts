import { Controller, Param, Post, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll() {
    return this.postService.findAll();
  }
}
