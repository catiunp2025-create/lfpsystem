import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDTO {
    @IsNotEmpty()
    @IsString()
    name!:string;

    @IsNotEmpty()
    @IsNumber()
    value!: number;

    @IsOptional()
    @IsString()
    description?: string;
}