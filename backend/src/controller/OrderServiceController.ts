import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrderService, Role } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { OrderServices } from "src/domain/OrderServiceRepository";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateOrderServiceDTO } from "src/shared/dtos/order_service/CreateOrderServiceDTO";
import { CreateOrderSericeUseCase } from "src/usecase/order_service/CreateOrderServiceUseCase";
import { FindOrderServiceUseCase } from "src/usecase/order_service/FindOrderServiceUseCase";
import { ListOrderServiceUseCase } from "src/usecase/order_service/ListOrderServiceUseCase";

@Controller('/order-services')
export class OrderServiceController{
    constructor(
        private readonly createOrderServiceUseCase: CreateOrderSericeUseCase,
        private readonly listOrderServiceUseCase: ListOrderServiceUseCase,
        private readonly findOrderServiceUseCase: FindOrderServiceUseCase
    ){}


    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(@Body(){vehicleUserId, date, addressId, serviceIds}: CreateOrderServiceDTO):Promise<OrderService>{
        return this.createOrderServiceUseCase.execute({vehicleUserId, date, addressId,serviceIds});
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    list():Promise<OrderServices[]>{
        return this.listOrderServiceUseCase.execute();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    findById(@Param('id') id: string):Promise<OrderServices | null>{
        return this.findOrderServiceUseCase.execute({id});
    }
}