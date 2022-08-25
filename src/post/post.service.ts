import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UserPost } from './post.entity';

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

    getAllPosts(): Promise<UserPost[]> {
        return this.postsRepository.find({
            order: { createdAt: 'DESC' },
            relations: ['author', 'likedBy']
        });
    }
}
