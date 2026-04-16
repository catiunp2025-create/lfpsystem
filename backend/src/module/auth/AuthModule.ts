import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/controller/AuthController";
import { CredentialRepository } from "src/domain/CredentialRepository";
import { PrismaCredentialRepository } from "src/external/repositories/remote/PrismaCredentialRepository";
import { LoginUseCase } from "src/usecase/auth/LoginUseCase";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '1d'},
        }),
    ],
    controllers: [AuthController],
    providers: [
        LoginUseCase,
        {
            provide: CredentialRepository,
            useClass: PrismaCredentialRepository,
        }
    ],
})

export class AuthModule{}