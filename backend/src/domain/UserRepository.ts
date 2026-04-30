import { Credential, Role, User } from "@prisma/client";

export interface Create {
    name: string;
    role: Role;
    email: string;
    password: string;

}

export type Users = User &{credential: Credential}

export abstract class UserRepository {
    abstract create({name, role, email, password}: Create): Promise<User>;
    abstract findAll():Promise<Users[]>;
}