import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Customer, Role } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateCustomerDTO } from "src/shared/dtos/customer/CreateCustomerDTO";
import { CreateCustomerUseCase } from "src/usecase/customer/CreateCustomerUseCase";

@Controller('/customers')
export class CustomerController{
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase
    ){}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(@Body(){name, type, value}: CreateCustomerDTO):Promise<Customer>{
        return this.createCustomerUseCase.execute({name, type, value})
    }
}