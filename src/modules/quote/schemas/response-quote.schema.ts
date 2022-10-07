import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Quote } from './create-quote.schema';

export type ResponseQuoteDocument = ResponseQuote & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  strict: false,
})
export class ResponseQuote {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quote' })
  quoteRequestId: Quote;

  @Prop()
  fee: number;

  @Prop()
  quoteId: string;
}

export const ResponseQuoteSchema = SchemaFactory.createForClass(ResponseQuote);
