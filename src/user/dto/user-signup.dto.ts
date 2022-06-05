import { ApiProperty } from "@nestjs/swagger";

export class UserSignupDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string
}