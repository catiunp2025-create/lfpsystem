import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Role, Vehicle } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateVehicleDTO } from "src/shared/dtos/vehicle/CreateVehicleDTO";
import { CreateVehicleUseCase } from "src/usecase/vehicle/CreateVehicleUseCase";
import { ListVehicleUseCase } from "src/usecase/vehicle/ListVehicleUseCase";

@Controller('/vehicles')
export class VehicleController{
    constructor(
        private readonly createVehicleUseCase: CreateVehicleUseCase,
        private readonly listVehicleUseCase: ListVehicleUseCase){}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(@Body(){model, plate, color}: CreateVehicleDTO):Promise<Vehicle>{
        return this.createVehicleUseCase.execute({model, plate, color});
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    list():Promise<Vehicle[]>{
        return this.listVehicleUseCase.execute();
    }

    
}