import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role, VehicleUser } from '@prisma/client';
import { Roles } from 'src/decorators/Roles.decorator';
import { FindAll } from 'src/domain/VehicleUserRepository';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RolesGuard';
import { CreateVehicleUserDTO } from 'src/shared/dtos/vehicle_user/CreateVehicleUserDTO';
import { CreateVehicleUserUseCase } from 'src/usecase/vehicle_user/CreateVehicleUserUseCase';
import { ListVehicleUserUseCase } from 'src/usecase/vehicle_user/ListVehicleUserUseCase';

@Controller()
export class VehicleUserController {
  constructor(
    private readonly createVehicleUserUseCase: CreateVehicleUserUseCase,
    private readonly listVehicleUserUseCase: ListVehicleUserUseCase,
  ) {}

  @Post('/vehicles/:vehicleId/users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  create(
    @Param('vehicleId') vehicleId: string,
    @Body() { userId, type }: CreateVehicleUserDTO,
  ): Promise<VehicleUser> {
    return this.createVehicleUserUseCase.execute({ vehicleId, userId, type });
  }

  @Get('/vehicle-users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  list(): Promise<FindAll[]> {
    return this.listVehicleUserUseCase.execute();
  }
}
