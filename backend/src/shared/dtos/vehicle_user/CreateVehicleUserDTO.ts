import { VehicleUserType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleUserDTO{

    @IsNotEmpty()
    @IsString()
    userId!: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(VehicleUserType)
    type!: VehicleUserType
}