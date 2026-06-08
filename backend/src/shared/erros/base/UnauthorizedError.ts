import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedError extends UnauthorizedException {
  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  public statusCode!: number;

  @ApiProperty({ type: () => String })
  public message!: string;

  @ApiProperty({ type: () => String })
  public error!: string;

  constructor(message: string, error: string) {
    super(message, error);
  }
}
