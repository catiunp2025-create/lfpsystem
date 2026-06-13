import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/CurrentUser.decorator';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { CurrentUserDTO } from 'src/shared/dtos/auth/CurrentUserDTO';
import { LoginDTO } from 'src/shared/dtos/auth/LoginDTO';
import { TokenDTO } from 'src/shared/dtos/auth/TokenDTO';
import { LoginUseCase } from 'src/usecase/auth/LoginUseCase';

@Controller()
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('/auth/login')
  login(@Body() { email, password }: LoginDTO): Promise<TokenDTO> {
    return this.loginUseCase.execute({
      email,
      password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/me')
  me(@CurrentUser() user: CurrentUserDTO): CurrentUserDTO {
    return user;
  }
}
