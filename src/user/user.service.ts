import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { parse } from 'path';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findBySlack(slug: string) {
    return this.userRepository.findBySlack(slug);
  }

  findById(id: string) {
    return this.userRepository.findById(id);
  }
  updateUsername(id: string, newUsername: string) {
    return this.userRepository.updateUsername(parseInt(id, 10), newUsername);
  }
}
