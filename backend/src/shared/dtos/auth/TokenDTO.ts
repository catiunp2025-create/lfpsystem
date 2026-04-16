import { Role } from "@prisma/client";

export class TokenDTO {
    public accessToken!: string;
}

export class TokenPayloadDTO {
    public userId!: string;
    public name!: string;
    public role!: Role;
}