import { Injectable } from "@nestjs/common";
import { Role, User } from "@prisma/client";
import { hash } from "bcrypt";
import { CredentialRepository } from "src/domain/CredentialRepository";
import { UserRepository } from "src/domain/UserRepository";
import { EmailAlreadyExists } from "src/shared/erros/cases/EmailAlreadyExists";

interface Request {
    name: string;
    role: Role;
    email: string;
    password: string;
}

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly credentialRepository: CredentialRepository,
    ){}

    async execute({name, role, email, password}: Request): Promise<User>{
        const credentialAlreadyExists = await this.credentialRepository.findBy({email});

        if(credentialAlreadyExists){
            throw new EmailAlreadyExists();
        }
        
        const passwordHash = await hash(password, 10);

        const newUser = await this.userRepository.create({
            name,
            role,
            email,
            password: passwordHash
        })

        return newUser;
    }
}