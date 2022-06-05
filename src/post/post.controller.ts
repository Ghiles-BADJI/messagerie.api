import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { UserPost } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) { }

    @Post('post')
    async createPost(@Body() body: CreatePostDto): Promise<UserPost> {
        return this.postService.createPost(body);
    }

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }
}
