import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { CustomConsoleLogger } from './custom-console-logger'; // Importer le logger personnalisé

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new CustomConsoleLogger(), // Utiliser le logger personnalisé
    });
    await app.listen(3000);
}
bootstrap();
