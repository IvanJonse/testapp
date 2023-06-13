import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.APP_PORT || 5000
  const app = await NestFactory.create(AppModule);

  const config =  new DocumentBuilder()
    .setTitle('Requests app')
    .setDescription('Документация REST API')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/api/doc', app, document)
  
  await app.listen(PORT, ()=> console.log(`Server started at ${PORT} port`));
}
bootstrap();
