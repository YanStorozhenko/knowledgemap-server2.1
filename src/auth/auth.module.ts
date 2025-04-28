import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserAuthService } from '../user-auth/user.auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET');
                return {
                    secret,
                    signOptions: { expiresIn: '7d' },
                };
            },
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy,
        JwtAuthGuard,


        {
            provide: 'AUTH_STRATEGY_DEBUG',
            useFactory: () => {
                const { Strategy: JwtDebugStrategy } = require('passport-jwt');
                console.log('✅ DEBUG: passport-jwt Strategy name:', JwtDebugStrategy.name);
                return true;
            }
        },


        UserAuthService
    ],
    controllers: [AuthController],
    exports: [
        JwtModule,
        AuthService
    ],
})
export class AuthModule {}
