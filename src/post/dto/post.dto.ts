import { User } from "src/user/user.entity";

export class CreatePostDto {

    id: number;

    title: string;

    description: string;

    imageUrl?: string;

    videoUrl?: string;

    author: User;

    likedBy: User[];

}