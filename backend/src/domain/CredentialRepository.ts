import { Credential, User } from '@prisma/client';

export interface FindBy {
  id?: string;
  email?: string;
  password?: string;
}

export abstract class CredentialRepository {
  abstract findBy({
    id,
    email,
    password,
  }: FindBy): Promise<(Credential & { user: User | null }) | null>;
}
