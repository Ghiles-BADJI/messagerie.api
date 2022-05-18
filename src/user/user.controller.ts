import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('login')
    login(@Body() body: { email: string; password: string }) {
        return this.userService.login(body.email, body.password);
    }

    @Post('signup')
    async signup(@Body() body: { email: string; password: string }) {
        return this.userService.signup(body.email, body.password);
    }

    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.deleteById(id);
    }

    @Get('')
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Put()
    updateUser(@Body() body: {id: number, email: string; password: string}) {
        return this.userService.updateUser(body.id, body.email, body.password);
    }
}
