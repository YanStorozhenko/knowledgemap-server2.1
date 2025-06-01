"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const data_source_1 = require("./data-source");
const swagger_1 = require("@nestjs/swagger");
const core_2 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
async function bootstrap() {
    await data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log('✅ Database connected successfully');
    })
        .catch((error) => {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Документація API Knowladge Map')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const reflector = app.get(core_2.Reflector);
    const guard = new ((0, passport_1.AuthGuard)('jwt'))(reflector);
    console.log('🧪 JwtAuthGuard instance created:', typeof guard.canActivate === 'function');
    await app.listen(process.env.PORT || 3001);
    console.log(`🚀 Server running on port ${process.env.PORT || 3001}`);
    console.log(`📄 Swagger available at http://localhost:${process.env.PORT || 3001}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map