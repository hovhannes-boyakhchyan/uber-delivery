import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import {
  Quote,
  QuoteSchema,
  ResponseQuote,
  ResponseQuoteSchema,
} from './schemas';
import {
  UberToken,
  UberTokenSchema,
} from '../../auth/schemas/uber-token.schema';
import { UberProvider } from '../../providers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quote.name, schema: QuoteSchema },
      { name: ResponseQuote.name, schema: ResponseQuoteSchema },
      { name: UberToken.name, schema: UberTokenSchema },
    ]),
    HttpModule,
  ],
  controllers: [QuoteController],
  providers: [QuoteService, UberProvider],
})
export class QuoteModule {}
