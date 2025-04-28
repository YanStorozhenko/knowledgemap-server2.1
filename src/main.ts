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


    // Налаштування Swagger
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Документація API Knowladge Map')
        .setVersion('1.0')
        // підтримка авторизації через JWT
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
    console.log('🧪 JwtAuthGuard instance created:', typeof guard.canActivate === 'function');

    await app.listen(process.env.PORT || 3000);



    console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    console.log(`📄 Swagger available at http://localhost:${process.env.PORT || 3000}/api/docs`);
}

bootstrap();
