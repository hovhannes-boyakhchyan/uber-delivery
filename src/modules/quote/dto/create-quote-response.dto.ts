export class CreateQuoteResponseDto {
  quotes: QuoteDto[];
  debug: any;
}

class QuoteDto {
  fee: number;
  quoteId: string;
}
