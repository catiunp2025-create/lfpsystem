import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CustomerParamDTO{
    
    @IsUUID()
    customerId!: string;
}