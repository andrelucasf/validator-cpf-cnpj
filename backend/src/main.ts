import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestCountInterceptor } from './middlewares/request-count.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new RequestCountInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Validação de CPF/CNPJ')
    .setDescription('Descrição da API de validação')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
