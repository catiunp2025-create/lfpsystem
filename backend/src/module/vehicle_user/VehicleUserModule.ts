import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { VehicleUserController } from "src/controller/VehicleUserController";
import { VehicleUserRepository } from "src/domain/VehicleUserRepository";
import { PrismaVehicleUserRepository } from "src/external/repositories/remote/PrismaVehicleUserRepository";
import { JwtStrategy } from "src/strategies/JwtStrategy";
import { CreateVehicleUserUseCase } from "src/usecase/vehicle_user/CreateVehicleUserUseCase";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [VehicleUserController],
    providers: [
        CreateVehicleUserUseCase,
        JwtStrategy,
        {
            provide: VehicleUserRepository,
            useClass: PrismaVehicleUserRepository,
        }
    ],
})

export class VehicleUserModule{}