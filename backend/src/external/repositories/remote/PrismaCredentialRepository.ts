import { CredentialRepository, FindBy } from 'src/domain/CredentialRepository';
import { PrismaRemoteRepository } from './PrismaRemoteRepository';
import { Injectable } from '@nestjs/common';
import { Credential, User } from '@prisma/client';

@Injectable()
export class PrismaCredentialRepository implements CredentialRepository {
  constructor(private readonly repository: PrismaRemoteRepository) {}

  async findBy({
    id,
    email,
    password,
  }: FindBy): Promise<(Credential & { user: User | null }) | null> {
    return this.repository.credential.findFirst({
      where: {
        id,
        email,
        password,
      },
      include: { user: true },
    });
  }
}
