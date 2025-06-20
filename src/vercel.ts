import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.setGlobalPrefix('api');
    await app.init();

    // Hello на /
    server.get('/', (_req, res) => {
        res.send('Hello from NestJS on Vercel!');
    });

    // Проксі для API
    server.all('/api/*', (req, res) => {
        app.getHttpAdapter().getInstance()(req, res);
    });
}

bootstrap();

export default server;
