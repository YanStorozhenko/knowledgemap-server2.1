
import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import {JwtPayload} from "./jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor( private readonly authService: AuthService,
                 private readonly configService: ConfigService,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')!,
        });

    }

    async validate(payload: JwtPayload): Promise<any> {
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
}
