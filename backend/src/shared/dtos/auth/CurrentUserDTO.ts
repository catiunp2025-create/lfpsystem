import { Role } from "@prisma/client";

export class CurrentUserDTO{
    id!: string;
    email!: string;
    name!: string;
    role!: Role;
}