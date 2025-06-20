import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
    await AppDataSource.initialize()
        .then(() => {
            console.log('✅ Database connected successfully');
        })
        .catch((error) => {
            console.error('❌ Database connection failed:', error);
            process.exit(1);
        });

    const app = await NestFactory.create(AppModule, { cors: true });

    // Глобальний префікс
    app.setGlobalPrefix('api');

    // Swagger конфіг
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Документація API Knowledge Map')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                in: 'header',
            },
            'access-token',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const reflector = app.get(Reflector);
    const guard = new (AuthGuard('jwt'))(reflector);
    console.log('---- JwtAuthGuard instance created:', typeof guard.canActivate === 'function');

    const port = process.env.PORT || 3001;
    await app.listen(port);

    console.log(`---- Server running on port ${port}`);
    console.log(`---Swagger available at http://localhost:${port}/api/docs`);
}

bootstrap();
