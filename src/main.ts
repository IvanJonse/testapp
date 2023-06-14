import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { envFile } from "./config/app.config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const PORT = envFile.appPort || 5000;
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle("Requests app")
    .setDescription("Документация REST API")
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/doc", app, document);
  
  await app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
}

bootstrap();
