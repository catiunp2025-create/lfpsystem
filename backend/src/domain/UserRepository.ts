import { Role, User } from "@prisma/client";

export interface Create {
    name: string;
    role: Role;
    email: string;
    password: string;

}

export abstract class UserRepository {
    abstract create({name, role, email, password}: Create): Promise<User>;
}