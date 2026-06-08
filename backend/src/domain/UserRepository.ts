import { Role, User } from '@prisma/client';

export interface Create {
  name: string;
  role: Role;
  email: string;
  password: string;
}

export type Users = {
  id: string;
  name: string;
  role: Role;
  credential: {
    id: string;
    email: string;
  };
};

export type FindById = {
  id: string;
};

export abstract class UserRepository {
  abstract create({ name, role, email, password }: Create): Promise<User>;
  abstract findAll(): Promise<Users[]>;
  abstract findById({ id }: FindById): Promise<Users | null>;
}
