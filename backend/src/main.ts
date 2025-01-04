import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestCountInterceptor } from './middlewares/request-count.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new RequestCountInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
