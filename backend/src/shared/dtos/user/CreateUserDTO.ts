import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    public name!: string;

    @IsNotEmpty()
    public role!: Role;

    @IsNotEmpty()
    @IsEmail()
    public email!: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message: 'A senha deve ter letra maiúscla e um número!'
    })
    public password!: string
}