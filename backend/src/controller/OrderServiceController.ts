import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { OrderService, Role } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateOrderServiceDTO } from "src/shared/dtos/order_service/CreateOrderServiceDTO";
import { CreateOrderSericeUseCase } from "src/usecase/order_service/CreateOrderServiceUseCase";

@Controller('/order-services')
export class OrderServiceController{
    constructor(
        private readonly createOrderServiceUseCase: CreateOrderSericeUseCase
    ){}


    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(@Body(){vehicleUserId, date, addressId, serviceIds}: CreateOrderServiceDTO):Promise<OrderService>{
        return this.createOrderServiceUseCase.execute({vehicleUserId, date, addressId,serviceIds});
    }
}