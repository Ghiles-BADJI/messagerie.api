import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";

export class CreatePostDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    imageUrl?: string;

    @ApiProperty()
    videoUrl?: string;

    @ApiProperty()
    author: User;

    @ApiProperty()
    likedBy: User[];

}