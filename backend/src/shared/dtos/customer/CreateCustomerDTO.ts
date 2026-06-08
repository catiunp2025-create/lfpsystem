import { IdentificationType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsValidIdentification } from 'src/validators/IsValidIdentification';

export class CreateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEnum(IdentificationType)
  type!: IdentificationType;

  @IsNotEmpty()
  @IsString()
  @IsValidIdentification()
  value!: string;
}
