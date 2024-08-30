import { NestFactory } from '@nestjs/core';
import { getBotToken } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(app.get<Telegraf>(getBotToken('/tg-bot')));
  app.enableCors();
  await app.listen(8080 || process.env.PORT);
}

bootstrap();
