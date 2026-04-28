import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { Role, VehicleUser } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateVehicleUserDTO } from "src/shared/dtos/vehicle_user/CreateVehicleUserDTO";
import { CreateVehicleUserUseCase } from "src/usecase/vehicle_user/CreateVehicleUserUseCase";

@Controller()
export class VehicleUserController{
    constructor(private readonly createVehicleUserUseCase: CreateVehicleUserUseCase){}

    @Post('/vehicles/:vehicleId/users')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(
        @Param('vehicleId') vehicleId: string,
        @Body(){userId, type}: CreateVehicleUserDTO):Promise<VehicleUser>{
            return this.createVehicleUserUseCase.execute({vehicleId, userId, type})
        };
}