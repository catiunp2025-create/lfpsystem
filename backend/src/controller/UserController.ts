import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User, Role } from "@prisma/client";
import { Roles } from "src/decorators/Roles.decorator";
import { JwtAuthGuard } from "src/guards/JwtAuthGuard";
import { RolesGuard } from "src/guards/RolesGuard";
import { CreateUserDTO } from "src/shared/dtos/user/CreateUserDTO";
import { CreateUserUseCase } from "src/usecase/user/CreateUserUseCase";

@Controller('/users')
export class UserController{
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ){}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.MANAGER)
    create(@Body() {name, role, email, password}: CreateUserDTO): Promise<User>{
        return this.createUserUseCase.execute({name, role, email, password});
    }

}