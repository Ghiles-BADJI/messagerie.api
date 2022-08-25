import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UserPost } from './post.entity';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) { }

    @Post()
    @ApiBadRequestResponse()
    @ApiCreatedResponse({ type: UserPost })
    async createPost(@Body() body: CreatePostDto): Promise<UserPost> {
        return this.postService.createPost(body);
    }

    @Get()
    getAllPosts(): Promise<UserPost[]> {
        return this.postService.getAllPosts();
    }
}
