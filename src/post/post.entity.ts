import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserPost {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty({ required: false })
    @Column()
    imageUrl?: string;

    @ApiProperty({ required: false })
    @Column()
    videoUrl?: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, user => user.posts)
    author: User;

    @ApiProperty({ type: () => User, isArray: true })
    @ManyToMany(() => User)
    @JoinTable()
    likedBy: User[];

}

