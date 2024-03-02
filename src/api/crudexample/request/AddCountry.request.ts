import { IsNotEmpty, IsString } from "class-validator";

export class RequestAddCountry {
    @IsString()
    @IsNotEmpty()
    name!: string;
}