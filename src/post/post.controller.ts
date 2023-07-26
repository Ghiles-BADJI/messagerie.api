import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
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

    @Get(':userId')
    @ApiParam({name: 'userId', type: Number})
    getAllPosts(@Param('userId', ParseIntPipe) userId: number): Promise<UserPost[]> {
        return this.postService.getAllPosts(userId);
    }
}
