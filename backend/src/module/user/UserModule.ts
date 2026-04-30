import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "src/controller/UserController";
import { CredentialRepository } from "src/domain/CredentialRepository";
import { UserRepository } from "src/domain/UserRepository";
import { PrismaCredentialRepository } from "src/external/repositories/remote/PrismaCredentialRepository";
import { PrismaUserRepository } from "src/external/repositories/remote/PrismaUserRepository";
import { JwtStrategy } from "src/strategies/JwtStrategy";
import { CreateUserUseCase } from "src/usecase/user/CreateUserUseCase";
import { ListUsersUseCase } from "src/usecase/user/ListUsersUseCase";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [UserController],
    providers: [
        CreateUserUseCase,
        ListUsersUseCase,
        JwtStrategy,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
        {
            provide: CredentialRepository,
            useClass: PrismaCredentialRepository,
        }
    ],
})

export class UserModule{}