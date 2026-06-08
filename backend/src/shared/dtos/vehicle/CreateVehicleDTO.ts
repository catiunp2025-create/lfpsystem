import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateVehicleDTO {
  @IsNotEmpty()
  @IsString()
  model!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]{3}-?\d{1}[A-Z0-9]{1}\d{2}$/, {
    message: 'Placa inválida. Formatos aceitos: ABC-1234 ou ABC1D23',
  })
  plate!: string;

  @IsNotEmpty()
  @IsString()
  color!: string;
}
