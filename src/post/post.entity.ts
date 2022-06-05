import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserPost {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    imageUrl?: string;

    @Column()
    videoUrl?: string;

    @ManyToOne(() => User, user => user.posts)
    author: User;

    @ManyToMany(() => User)
    @JoinTable()
    likedBy: User[];

}

