import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Req,
    BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    // 🔐 Тестова реєстрація адміна через Swagger
    @Post('register-admin')
    async registerAdmin() {
        return this.authService.createAdmin();
    }

    // 🔐 Захищений ендпойнт — перевірка токена Firebase
    @UseGuards(FirebaseAuthGuard)
    @Get('protected')
    getProtected(@Req() req: Request) {
        return {
            message: '✅ Access granted (Firebase Token Valid)',
            user: req.user, // це декодований Firebase токен (uid, email тощо)
        };
    }

    // ✅ Опційна ручна реєстрація користувача (через email)
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new BadRequestException('Користувач з таким email вже існує!');
        }
        return this.usersService.create(createUserDto);
    }
}
