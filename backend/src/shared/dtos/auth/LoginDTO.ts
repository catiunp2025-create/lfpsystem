import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LoginDTO {

    @IsNotEmpty()
    @IsEmail()
    public email!: string;

    @IsNotEmpty()
    @IsString()
    public password!: string
}

