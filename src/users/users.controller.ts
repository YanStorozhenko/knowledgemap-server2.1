import { Controller, Get, Query, Param, Delete, Patch, Req, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './entities/user.entity';
import {ApiBearerAuth} from "@nestjs/swagger";

import { Request } from 'express';


@ApiBearerAuth('access-token')
@Controller('users')


export class UsersController {
    constructor(private readonly usersService: UsersService) {}



    // Отримати всіх користувачів (тільки адміну)

//тестовий
    @Get('all')
    getAllUsers(@Req() req: Request) {
        console.log('User from token:', req.user);
        console.log('rec:', req);
        return this.usersService.findAll();
    }



    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    getUsers(@Req() req: Request) {
        console.log('User from token:', req.user);
        return this.usersService.findAll();
    }


    // Отримати користувача по ID
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    // Оновити користувача (самому собі або адміну)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    // Видалити користувача (тільки адміну)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    // Пошук користувачів із пагінацією та сортуванням
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
        return this.usersService.search({ name, email, role, page, limit, sortBy, sortOrder });
    }
}
