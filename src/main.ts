import { NestFactory } from '@nestjs/core';
import { getBotToken } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = app.get<Telegraf>(getBotToken());
  app.use(bot.webhookCallback('/tg-bot'));
  app.enableCors();
  await app.listen(8080 || process.env.PORT);
}

bootstrap();
