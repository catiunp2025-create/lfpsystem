import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ContactController } from "src/controller/ContactController";
import { ContactRepository } from "src/domain/ContactRepository";
import { PrismaContactRepository } from "src/external/repositories/remote/PrismaContactRepository";
import { JwtStrategy } from "src/strategies/JwtStrategy";
import { CreateContactUseCase } from "src/usecase/contact/CreateContactUseCase";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [ContactController],
    providers: [
        CreateContactUseCase,
        JwtStrategy,
        {
            provide: ContactRepository,
            useClass: PrismaContactRepository,
        }
    ],
})

export class ContactModule{}