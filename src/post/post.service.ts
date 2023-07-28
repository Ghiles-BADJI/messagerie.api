import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UserPost } from './post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {

    constructor(@InjectRepository(UserPost)
    private postsRepository: Repository<UserPost>, private readonly userService: UserService
    ) { }

    async createPost(postDto: CreatePostDto): Promise<UserPost> {
        const userExists = await this.userService.userExistById(postDto.author.id);
        if (!userExists) {
            throw new BadRequestException("L'auteur du post n'existe pas")
        }

        const user: UserPost = new UserPost();
        user.title = postDto.title;
        user.description = postDto.description;
        user.imageUrl = postDto.imageUrl;
        user.likedBy = postDto.likedBy;
        user.videoUrl = postDto.videoUrl;
        user.author = postDto.author;
        user.createdAt = new Date();

        const poste: UserPost = this.postsRepository.create(user);

        return this.postsRepository.save(poste);
    }

    async getAllPosts(userId: number): Promise<UserPost[]> {
         const user: User = await this.userService.getUserById(userId);
         const userFriendsIds : number[] = user.friends.map((userFriend) => userFriend.id)
         return this.postsRepository.find({
            where: {author: {id: In([userId, ...userFriendsIds])}},
            order: { createdAt: 'DESC' },
            relations: ['author', 'likedBy']
        });
    }
}
