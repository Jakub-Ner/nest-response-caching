// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MetadataService } from 'src/metadata/metadata.service';
import { CLEAR_CACHE_KEY } from 'src/clear-cache.decorator';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly metadataService: MetadataService,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findBySlack(slug: string) {
    return this.userRepository.findBySlack(slug);
  }

  findById(id: string) {
    return this.userRepository.findById(id);
  }
  async updateUsername(id: string, newUsername: string) {
    const user = await this.userRepository.findById(id);
    this.metadataService.setMetadata(CLEAR_CACHE_KEY, `/user/slug/${user.username}`);
    return this.userRepository.updateUsername(parseInt(id, 10), newUsername);
  }
}
