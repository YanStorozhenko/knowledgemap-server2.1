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
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(FirebaseAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    getUsers(@Req() req: Request) {
        return this.usersService.findAll();
    }

    // @UseGuards(FirebaseAuthGuard)
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.usersService.findOne(+id);
    // }

    // @UseGuards(FirebaseAuthGuard)
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }

    // @UseGuards(FirebaseAuthGuard, RolesGuard)
    // @Roles(UserRole.ADMIN)
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }

    @UseGuards(FirebaseAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('save')
    async saveAfterGoogleLogin(@Body() body: { firebase_uid: string, email: string, name: string, avatarUrl?: string }) {
        const { firebase_uid, email, name, avatarUrl } = body;

        const existingUser = await this.usersService.findByFirebaseUid(firebase_uid);
        if (existingUser) return existingUser;

        return this.usersService.create({
            firebase_uid,
            email,
            name,
            avatarUrl,
            role: UserRole.STUDENT,
        });
    }

    @UseGuards(FirebaseAuthGuard)
    @Get('me')
    async getMe(@Req() req: Request) {
        const firebaseUid = (req.user as any).uid;
        const user = await this.usersService.findByFirebaseUid(firebaseUid);
        return {
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }

    @UseGuards(FirebaseAuthGuard)
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
