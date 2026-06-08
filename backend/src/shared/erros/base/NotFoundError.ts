import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundError extends NotFoundException {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  public statusCode!: number;

  @ApiProperty({ type: () => String })
  public message!: string;

  constructor(message: string, error: string) {
    super(message, error);
  }
}
