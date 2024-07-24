import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TransactionDTO
{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    celular: number;

    @IsNotEmpty()
    @IsNumber()
    cod: number;

    @IsNotEmpty()
    @IsString()
    dir: string;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    numberCard: number;

    @IsNotEmpty()
    @IsString()
    cvv: number;
}

export class TokenCardDTO
{
    @IsNotEmpty()
    @IsString()
    number: string;

    @IsNotEmpty()
    @IsString()
    cvc: string;

    @IsNotEmpty()
    @IsString()
    exp_month:string;

    @IsNotEmpty()
    @IsString()
    exp_year:string;

    @IsNotEmpty()
    @IsString()
    card_holder:string;
}
