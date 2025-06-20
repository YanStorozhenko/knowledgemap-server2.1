import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

const server = express();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await app.init();

    // (опціонально) відповісти одразу на / поки Nest не готовий
    server.get('/', (_req: Request, res: Response) => {
        res.send('Hello from NestJS on Vercel!');
    });
}

bootstrap();

export default server;
