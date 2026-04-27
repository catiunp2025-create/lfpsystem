import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { Contact, Role } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateContactDTO } from "src/shared/dtos/contact/CreateContactDTO";
import { CustomerParamDTO } from "src/shared/dtos/customer/CustomerParamDTO";
import { CreateContactUseCase } from "src/usecase/contact/CreateContactUseCase";

@Controller()
export class ContactController{
    constructor(private readonly createContactUseCase: CreateContactUseCase){}

    @Post('/customers/:customerId/contacts')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(
        @Param(){customerId}: CustomerParamDTO,
        @Body(){type, value}: CreateContactDTO): Promise<Contact>{
        return this.createContactUseCase.execute({customerId, type, value})
    }
}