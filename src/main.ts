import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { AuthRolesGuard } from './auth/auth-roles.guard';
import { UsersService } from './users/users.service';

async function bootstrap() {
    await AppDataSource.initialize()
        .then(() => {
            console.log('✅ Database connected successfully');
        })
        .catch((error) => {
            console.error('❌ Database connection failed:', error);
            process.exit(1);
        });

    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: ['https://knowledgemap-frontend2-0.vercel.app', 'http://localhost:5173'],
        credentials: true,
    });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') return res.sendStatus(200);
        next();
    });

    app.setGlobalPrefix('api');

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
    const usersService = app.get(UsersService);
    app.useGlobalGuards(new AuthRolesGuard(reflector, usersService));

    const port = process.env.PORT || 3001;
    await app.listen(port);

    console.log(`---- Server running on port ${port}`);
    console.log(`---Swagger available at http://localhost:${port}/api/docs`);
}

bootstrap();
