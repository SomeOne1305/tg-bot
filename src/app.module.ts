import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { join } from 'path';
import RedisSession from 'telegraf-session-redis';
import { BotModule } from './modules/bot/bot.module';
@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7149624258:AAERhmhXDvr9EOSvCW07PfAzxbbzW-DG5i0',
      middlewares: [
        new RedisSession({
          store: {
            host: 'redis-14738.c8.us-east-1-4.ec2.redns.redis-cloud.com',
            port: 14738,
            password: 'bx7NrQsE3hxYZONIdEn0VcBgQO3JpjYh',
          },
        }).middleware(),
      ],
      launchOptions: {
        webhook: {
          domain: process.env.VERCEL_URL,
          path: '/tg-bot',
        },
        dropPendingUpdates: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        // host: 'localhost',
        // port: 5432,
        // username: 'postgres',
        // password: '12345678',
        // database: 'portfolio',
        url: 'postgres://default:BxeObYjM6H2g@ep-polished-wildflower-a4u5k8c3-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&charset=utf8',
        ssl: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
