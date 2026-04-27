import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { Address, Role } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateAddressDTO } from "src/shared/dtos/address/CreateAddressDTO";
import { CustomerParamDTO } from "src/shared/dtos/customer/CustomerParamDTO";
import { CreateAddressUseCase } from "src/usecase/address/CreateAddressUseCase";

@Controller()
export class AddressController {
    constructor(private readonly createAddressUseCase: CreateAddressUseCase){}

    @Post('/customers/:customerId/address')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(
        @Param() {customerId}: CustomerParamDTO,
        @Body(){street, number, complement, neighborhood, postCode, city, state}: CreateAddressDTO
    ):Promise<Address>{
        return this.createAddressUseCase.execute({customerId, street, number, complement, neighborhood, postCode, city, state});
    }
}