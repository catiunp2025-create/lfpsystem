import { BadRequestException, HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class BadRequestError extends BadRequestException{
    @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  public statusCode!: number;

  @ApiProperty({ type: () => String })
  public message!: string;

  @ApiProperty({ type: () => String })
  public error!: string;

  constructor(message: string, error: string) {
    super(message, error);
  }
}