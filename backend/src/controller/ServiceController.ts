import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role, Service } from '@prisma/client';
import { Roles } from 'src/decorators/Roles.decorator';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RolesGuard';
import { CreateServiceDTO } from 'src/shared/dtos/service/CreateServiceDTO';
import { CreateServiceUseCase } from 'src/usecase/service/CreateServiceUseCase';
import { FindServiceUseCase } from 'src/usecase/service/FindServiceUseCase';
import { ListServiceUseCase } from 'src/usecase/service/ListServiceUseCase';

@Controller('/services')
export class ServiceController {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly listServiceUseCase: ListServiceUseCase,
    private readonly findServiceUseCase: FindServiceUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  create(
    @Body() { name, value, description }: CreateServiceDTO,
  ): Promise<Service> {
    return this.createServiceUseCase.execute({ name, value, description });
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  list(): Promise<Service[]> {
    return this.listServiceUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  findById(@Param() { id }: { id: string }): Promise<Service | null> {
    return this.findServiceUseCase.execute({ id });
  }
}
