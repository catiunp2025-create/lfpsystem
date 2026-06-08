import { IsArray, IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderServiceDTO {
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  vehicleUserIds!: string[];

  @IsNotEmpty()
  @IsDate()
  date!: Date;

  @IsNotEmpty()
  @IsUUID()
  addressId!: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  serviceIds!: string[];
}
