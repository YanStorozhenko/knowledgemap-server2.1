
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();

        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ForbiddenException('Не вказано токен авторизації');
        }

        const token = authHeader.split(' ')[1];
        let user;

        try {
            user = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            });
        } catch (e) {
            throw new ForbiddenException('Невірний токен');
        }


        if (!user || !requiredRoles.includes(user.role as UserRole)) {
            throw new ForbiddenException('У вас немає прав доступу');
        }

        return true;
    }
}
