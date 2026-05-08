import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ServiceController } from "src/controller/ServiceController";
import { ServiceRepository } from "src/domain/ServiceRepository";
import { PrismaServiceRepository } from "src/external/repositories/remote/PrismaServiceRepository";
import { JwtStrategy } from "src/strategies/JwtStrategy";
import { CreateServiceUseCase } from "src/usecase/service/CreateServiceUseCase";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [ServiceController],
    providers: [
        CreateServiceUseCase,
        JwtStrategy,
        {
            provide: ServiceRepository,
            useClass: PrismaServiceRepository,
        },
    ],
})

export class ServiceModule{}