import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('login')
    @ApiOkResponse({ type: Boolean })
    @ApiUnauthorizedResponse()
    login(@Body() body: UserLoginDto): Promise<boolean> {
        return this.userService.login(body.email, body.password);
    }

    @Post('signup')
    @ApiOkResponse({ type: User })
    @ApiConflictResponse()
    async signup(@Body() body: UserSignupDto): Promise<User> {
        return this.userService.signup(body.email, body.password);
    }

    @Delete(':id')
    @ApiOkResponse()
    @ApiNotFoundResponse()
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.userService.deleteById(id);
    }

    @Get()
    @ApiOkResponse({ type: User, isArray: true })
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('email-exist/:email')
    @ApiOkResponse({ type: Boolean })
    emailExists(@Param('email') email: string): Promise<boolean> {
        return this.userService.emailExists(email)
    }

    @Put()
    @ApiOkResponse({ type: User })
    @ApiNotFoundResponse()
    updateUser(@Body() body: UserUpdateDto): Promise<User> {
        return this.userService.updateUser(body.id, body.email, body.password);
    }
}
