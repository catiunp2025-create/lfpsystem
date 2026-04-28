import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AddressController } from "src/controller/AddressController";
import { AddressRepository } from "src/domain/AddressRepository";
import { PrismaAddressRepository } from "src/external/repositories/remote/PrismaAddressRepository";
import { JwtStrategy } from "src/strategies/JwtStrategy";
import { CreateAddressUseCase } from "src/usecase/address/CreateAddressUseCase";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AddressController],
    providers: [
        CreateAddressUseCase,
        JwtStrategy,
        {
            provide: AddressRepository,
            useClass: PrismaAddressRepository,
        }
    ],
})

export class AddressModule{}