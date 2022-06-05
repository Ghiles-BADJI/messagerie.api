import { ApiProperty } from "@nestjs/swagger";
import { UserPost } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty({ type: () => UserPost, isArray: true })
    @OneToMany(() => UserPost, (poste) => poste.author)
    posts: UserPost[];
}