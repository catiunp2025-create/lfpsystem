import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User, Role } from '@prisma/client';
import { Roles } from 'src/decorators/Roles.decorator';
import { Users } from 'src/domain/UserRepository';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RolesGuard';
import { CreateUserDTO } from 'src/shared/dtos/user/CreateUserDTO';
import { CreateUserUseCase } from 'src/usecase/user/CreateUserUseCase';
import { FindUserUseCase } from 'src/usecase/user/FindUserUseCase';
import { ListUsersUseCase } from 'src/usecase/user/ListUsersUseCase';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  create(
    @Body() { name, role, email, password }: CreateUserDTO,
  ): Promise<User> {
    return this.createUserUseCase.execute({ name, role, email, password });
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  list(): Promise<Users[]> {
    return this.listUsersUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MANAGER)
  findById(@Param('id') id: string): Promise<Users | null> {
    return this.findUserUseCase.execute({ id });
  }
}
