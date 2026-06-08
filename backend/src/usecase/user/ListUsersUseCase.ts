import { Injectable } from '@nestjs/common';
import { UserRepository, Users } from 'src/domain/UserRepository';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Users[]> {
    return this.userRepository.findAll();
  }
}
