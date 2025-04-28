import { Controller, Post, Body, Get, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}


    ////// на період розробки
    @Post('register-admin')
    async registerAdmin() {
        return this.authService.createAdmin();
    }



    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getProtected(@Req() req) {
        console.log('🟢 From req.user:', req.user);
        return { message: 'Access granted', user: req.user };
    }



    @Post('login-admin')
    async loginAdmin() {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            throw new BadRequestException('Адмінські дані не встановлені в .env');
        }

        const adminUser = await this.usersService.findUserForAuth(adminEmail);


        const bcrypt = require('bcrypt');
        const isMatch = await bcrypt.compare(adminPassword, adminUser?.password ?? '');


        return isMatch ? this.authService.login(adminUser) : { message: '❌ Пароль не збігається' };
    }

//////

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new BadRequestException('Користувач з таким email вже існує!');
        }
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto })
    async login(@Body() body: LoginUserDto) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

}
