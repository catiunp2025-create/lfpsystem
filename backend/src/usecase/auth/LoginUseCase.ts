
import { TokenDTO } from "src/shared/dtos/auth/TokenDTO";
import { UserNotFound } from "src/shared/erros/cases/UserNotFound";
import * as bcrypt from 'bcrypt';
import { CredentialRepository } from "src/domain/CredentialRepository";
import { WrongPasswordOrEmail } from "src/shared/erros/cases/WrongPasswordOrEmail";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

interface Request{
    email: string;
    password: string;
}

type Response = TokenDTO;

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly credentialRepository: CredentialRepository,
        private jwtService: JwtService,
    ){}

    async execute({email, password}: Request): Promise<Response>{
        const credential = await this.credentialRepository.findBy({email});

        if(!credential){
            throw new UserNotFound();
        }

        if(!credential.user){
            throw new UserNotFound();
        }

        const isMatch = await bcrypt.compare(password, credential.password);

        if(!isMatch){
            throw new WrongPasswordOrEmail();
        }

        return {
            accessToken: await this.jwtService.signAsync({
                userId: credential.user.id,
                email: credential.email,
                name: credential.user.name,
                role: credential.user.role
            })
        };
    }
}