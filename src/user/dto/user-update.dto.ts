import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}