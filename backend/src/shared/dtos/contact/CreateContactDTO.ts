import { ContactType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsValidContact } from 'src/validators/IsValidContact';

export class CreateContactDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ContactType)
  type!: ContactType;

  @IsNotEmpty()
  @IsString()
  @IsValidContact()
  value!: string;
}
