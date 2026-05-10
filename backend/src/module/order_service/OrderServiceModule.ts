import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { OrderServiceController } from "src/controller/OrderServiceController";
import { OrderServiceRepository } from "src/domain/OrderServiceRepository";
import { ServiceOrderServiceRepository } from "src/domain/ServiceOrderServiceRepository";
import { PrismaOrderServiceRepository } from "src/external/repositories/remote/PrismaOrderServiceRepository";
import { PrismaServiceOrderServiceRepository } from "src/external/repositories/remote/PrismaServiceOrderServiceRepository";
import { JwtStrategy } from "src/strategies/JwtStrategy";
import { CreateOrderSericeUseCase } from "src/usecase/order_service/CreateOrderServiceUseCase";
import { ListOrderServiceUseCase } from "src/usecase/order_service/ListOrderServiceUseCase";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [OrderServiceController],
    providers: [
        CreateOrderSericeUseCase,
        ListOrderServiceUseCase,
        JwtStrategy,
        {
            provide: OrderServiceRepository,
            useClass: PrismaOrderServiceRepository,
        },
        {
                provide: ServiceOrderServiceRepository,
                useClass: PrismaServiceOrderServiceRepository,
        }
    ],
})

export class OrderServiceModule{}