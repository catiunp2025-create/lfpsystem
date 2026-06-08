import { Body, Controller, Post } from '@nestjs/common';
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
}
