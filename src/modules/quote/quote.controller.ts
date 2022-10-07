import { Body, Controller, Post } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './schemas';
import { ResponseQuote } from './schemas';
import { CreateQuoteResponseDto } from './dto/create-quote-response.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('/create')
  async createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
  ): Promise<CreateQuoteResponseDto> {
    console.log('------------Quote Data-------------', createQuoteDto);
    const quoteData: Quote = await this.quoteService.saveQuoteData(
      createQuoteDto,
    );
    const quote: ResponseQuote = await this.quoteService.create(quoteData);

    const response: CreateQuoteResponseDto = {
      quotes: [
        {
          fee: quote.fee,
          quoteId: quote.quoteId,
        },
      ],
      debug: {
        ...quote,
      },
    };
    console.log('------------Create Quote Response-------------', response);

    return response;
  }
}
