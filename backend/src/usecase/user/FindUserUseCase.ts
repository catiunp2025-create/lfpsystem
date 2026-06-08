import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/UserRepository';
import { UserNotFound } from 'src/shared/erros/cases/UserNotFound';

interface Request {
  id: string;
}

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Request) {
    const user = await this.userRepository.findById({ id });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
