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
    @Column({ nullable: true })
    imageUrl?: string;

    @ApiProperty({ required: false })
    @Column({ nullable: true })
    videoUrl?: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, user => user.id)
    author: User;

    @ApiProperty({ type: () => User, isArray: true })
    @ManyToMany(() => User)
    @JoinTable()
    likedBy: User[];

    @ApiProperty()
    @Column()
    createdAt?: Date;

}

