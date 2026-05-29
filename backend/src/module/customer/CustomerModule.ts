import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CustomerController } from "src/controller/CustomerController";
import { CustomerRepository } from "src/domain/CustomerRepository";
import { IdentificationRepository } from "src/domain/IdentificationRepository";
import { PrismaCustomerRepository } from "src/external/repositories/remote/PrismaCustomerRepository";
import { PrismaIdentificationRepository } from "src/external/repositories/remote/PrismaIdentificationRepository";
import { JwtStrategy } from "src/strategies/JwtStrategy";
import { CreateCustomerUseCase } from "src/usecase/customer/CreateCustomerUseCase";
import { FindCustomerUseCase } from "src/usecase/customer/FindCustomerUseCase";
import { ListCustomerUseCase } from "src/usecase/customer/ListCustomerUseCase";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [CustomerController],
    providers: [
        CreateCustomerUseCase,
        ListCustomerUseCase,
        FindCustomerUseCase,
        JwtStrategy,
        {
            provide: CustomerRepository,
            useClass: PrismaCustomerRepository,
        },
        {
            provide: IdentificationRepository,
            useClass: PrismaIdentificationRepository,
        }
    ],
})

export class CustomerModule{}