import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Customer, Role } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { Customers } from "src/domain/CustomerRepository";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateCustomerDTO } from "src/shared/dtos/customer/CreateCustomerDTO";
import { CreateCustomerUseCase } from "src/usecase/customer/CreateCustomerUseCase";
import { ListCustomerUseCase } from "src/usecase/customer/ListCustomerUseCase";

@Controller('/customers')
export class CustomerController{
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly listCustomerUseCase: ListCustomerUseCase
    ){}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(@Body(){name, type, value}: CreateCustomerDTO):Promise<Customer>{
        return this.createCustomerUseCase.execute({name, type, value})
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    list():Promise<Customers[]>{
        return this.listCustomerUseCase.execute();
    }
}