import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsString()
  street!: string;

  @IsNotEmpty()
  @IsString()
  number!: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsNotEmpty()
  @IsString()
  neighborhood!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'CEP inválido. Formato esperado: 00000-000',
  })
  postCode!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  state!: string;
}
