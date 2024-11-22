import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger dokümantasyonu oluşturuluyor
  const config = new DocumentBuilder()
    .setTitle('Hekazagonal Mimari') // API başlığı
    .setDescription('Hekazagonal Mimari API Dokümantasyonu') // API açıklaması
    .setVersion('1.0') // API versiyonu
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger'ı belirli bir endpoint'le açıyoruz
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
