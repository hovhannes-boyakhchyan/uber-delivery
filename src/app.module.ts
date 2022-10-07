import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { QuoteModule } from './modules/quote/quote.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { AuthModule } from './auth/auth.module';
import { WebhookEventsModule } from './modules/webhook-events/webhook-events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${
        process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production'
          ? 'production'
          : 'development'
      }.env`,
      load: [databaseConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    QuoteModule,
    DeliveryModule,
    AuthModule,
    WebhookEventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
