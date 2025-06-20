// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AppDataSource } from './data-source';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { Reflector } from '@nestjs/core';
// import { AuthRolesGuard } from './auth/auth-roles.guard';
// import { UsersService } from './users/users.service';
//
// async function bootstrap() {
//     // await AppDataSource.initialize()
//     //     .then(() => console.log('✅ Database connected successfully'))
//     //     .catch((error) => {
//     //         console.error('❌ Database connection failed:', error);
//     //         process.exit(1);
//     //     });
//
//     const app = await NestFactory.create(AppModule);
//
//     //Enable CORS
//     app.enableCors({
//         origin: [
//             'https://knowledgemap-frontend2-0.vercel.app',
//             'http://localhost:5173',
//         ],
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//         credentials: true,
//         allowedHeaders: 'Content-Type,Authorization',
//     });
//
//     // app.enableCors({
//     //     origin: ['https://knowledgemap-frontend2-0.vercel.app', 'http://localhost:5173'],
//     //     credentials: true,
//     // });
//
//
//
//     // Global prefix
//    // app.setGlobalPrefix('api');
//
//     // Swagger config
//     const config = new DocumentBuilder()
//         .setTitle('API Documentation')
//         .setDescription('Документація API Knowledge Map')
//         .setVersion('1.0')
//         .addBearerAuth(
//             {
//                 type: 'http',
//                 scheme: 'bearer',
//                 bearerFormat: 'JWT',
//                 name: 'Authorization',
//                 in: 'header',
//             },
//             'access-token',
//         )
//         .build();
//
//     const document = SwaggerModule.createDocument(app, config);
//     SwaggerModule.setup('api/docs', app, document);
//
//     // Set global guard
//     const reflector = app.get(Reflector);
//     const usersService = app.get(UsersService);
//     app.useGlobalGuards(new AuthRolesGuard(reflector, usersService));
//
//     const port = Number(process.env.PORT) || 3001;
//     console.log('Server initializing...', process.env.PORT, process.cwd());
//
//
//     await app.listen(port);
//
//     console.log(`---- Server running on port ${port}`);
//     // console.log(`--- Swagger available at http://localhost:${port}/api/docs`);
// }
//
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = Number(process.env.PORT) || 3000;
    console.log('Server initializing...', port, process.cwd());
    await app.listen(port);
    console.log(`Server started on port ${port} at ${new Date().toISOString()}`);
}

bootstrap();