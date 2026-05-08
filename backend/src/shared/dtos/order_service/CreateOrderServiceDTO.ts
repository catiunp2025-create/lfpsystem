import { IsArray, IsDate, IsNotEmpty, IsUUID } from "class-validator";

export class CreateOrderServiceDTO{
    @IsUUID()
    @IsNotEmpty()
    vehicleUserId!: string;

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