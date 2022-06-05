import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UserPost } from './post.entity';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) { }

    @Post()
    async createPost(@Body() body: CreatePostDto): Promise<UserPost> {
        return this.postService.createPost(body);
    }

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }
}
