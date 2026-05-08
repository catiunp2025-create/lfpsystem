import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Role, Service } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateServiceDTO } from "src/shared/dtos/service/CreateServiceDTO";
import { CreateServiceUseCase } from "src/usecase/service/CreateServiceUseCase";

@Controller('/services')
export class ServiceController{
    constructor(private readonly createServiceUseCase: CreateServiceUseCase){}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(@Body(){name, value, description}:CreateServiceDTO):Promise<Service>{
        return this.createServiceUseCase.execute({name, value, description});
    }
}