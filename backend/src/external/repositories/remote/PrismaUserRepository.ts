import { Create, UserRepository } from "src/domain/UserRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly repository: PrismaRemoteRepository){}

    create({ name, role, email, password }: Create): Promise<User> {
        return this.repository.$transaction(async (tx)=> {
            const credential = await tx.credential.create({
                data: {email, password}
            })

            const user = await tx.user.create({
                data: {name, role, credentialId: credential.id}
            })

            return user;
        })
    }
}