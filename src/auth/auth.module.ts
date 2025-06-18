import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserAuthService } from '../user-auth/user.auth.service';
import { AuthRolesGuard } from './auth-roles.guard';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
    ],
    providers: [
        AuthService,
        UserAuthService,
        {
            provide: APP_GUARD,
            useClass: AuthRolesGuard,
        },
    ],
    controllers: [AuthController],
    exports: [
        AuthService,
    ],
})
export class AuthModule {}
