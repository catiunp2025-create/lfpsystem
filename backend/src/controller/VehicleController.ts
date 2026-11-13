import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Role, Vehicle } from '@prisma/client';
import { Roles } from 'src/decorators/Roles.decorator';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RolesGuard';
import { CreateVehicleDTO } from 'src/shared/dtos/vehicle/CreateVehicleDTO';
import { CreateVehicleUseCase } from 'src/usecase/vehicle/CreateVehicleUseCase';
import { FindVehicleUseCase } from 'src/usecase/vehicle/FindVehicleUseCase';
import { ListVehicleUseCase } from 'src/usecase/vehicle/ListVehicleUseCase';
import { UpdateVehicleUseCase } from 'src/usecase/vehicle/UpdateVehicleUseCase';
import { DeleteVehicleUseCase } from 'src/usecase/vehicle/DeleteVehicleUseCase';

@Controller('/vehicles')
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
    private readonly listVehicleUseCase: ListVehicleUseCase,
    private readonly findVehicleUseCase: FindVehicleUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  create(@Body() { model, plate, color }: CreateVehicleDTO): Promise<Vehicle> {
    return this.createVehicleUseCase.execute({ model, plate, color });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  update(
    @Param('id') id: string,
    @Body() { model, plate, color }: CreateVehicleDTO,
  ): Promise<Vehicle> {
    return this.updateVehicleUseCase.execute({ id, model, plate, color });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteVehicleUseCase.execute({ id });
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  list(): Promise<Vehicle[]> {
    return this.listVehicleUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  findById(@Param('id') id: string): Promise<Vehicle | null> {
    return this.findVehicleUseCase.execute({ id });
  }
}
