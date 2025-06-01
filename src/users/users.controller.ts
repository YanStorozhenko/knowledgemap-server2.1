import {
    Controller,
    Get,
    Query,
    Param,
    Delete,
    Patch,
    Req,
    Body,
    UseGuards,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // 🔐 Отримати всіх користувачів (тільки адміну)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    getUsers(@Req() req: Request) {
        return this.usersService.findAll();
    }

    // 🔐 Отримати користувача по ID (авторизованим)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    // 🔐 Оновити користувача (сам собі або адміну)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    // 🔐 Видалити користувача (тільки адміну)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    // 🔐 Створити нового користувача (тільки адміну)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // 🔐 Пошук користувачів із пагінацією та сортуванням
    @UseGuards(JwtAuthGuard)
    @Get('search')
    search(
        @Query('name') name?: string,
        @Query('email') email?: string,
        @Query('role') role?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('sortBy') sortBy?: string,
        @Query('sortOrder') sortOrder?: string,
    ) {
        return this.usersService.search({
            name,
            email,
            role,
            page,
            limit,
            sortBy,
            sortOrder,
        });
    }
}
