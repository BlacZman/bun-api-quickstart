import { IsNotEmpty, IsString } from "class-validator";

export class RequestAddUser {
    @IsString()
    @IsNotEmpty()
    name!: string;
    
    @IsString()
    @IsNotEmpty()
    countryName!: string;
}