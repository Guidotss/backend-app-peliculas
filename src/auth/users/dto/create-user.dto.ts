import { IsString,MinLength, MaxLength,IsEmail,IsArray,IsOptional } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly name: string; 

    @IsString()
    @IsEmail()
    readonly email: string; 

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly password: string;

    @IsOptional()
    @IsArray({
        each: true,
    })
    readonly filmsIds?: string[];
}
