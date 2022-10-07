import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AddressSchema, Address } from '../../../schemas/address.schema';

export type QuoteDocument = Quote & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
})
export class Quote {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop({ type: AddressSchema, required: true })
  dropoffAddress: Address;

  @Prop({ type: AddressSchema, required: true })
  pickupAddress: Address;

  @Prop()
  dropoffPhoneNumber: string;

  @Prop()
  pickupPhoneNumber: string;

  @Prop()
  pickupStartTime: string;

  @Prop()
  pickupEndTime: string;

  @Prop()
  dropoffStartTime: string;

  @Prop()
  dropoffEndTime: string;

  @Prop({ set: (v) => Math.round(v * 100) }) // in cents
  orderValue: number;

  @Prop()
  itemsCount: number;

  @Prop()
  externalStoreId: string;

  @Prop()
  pickupBusinessName: string;

  @Prop()
  dropoffName: string;

  @Prop()
  dropoffInstructions: string;

  @Prop()
  pickupInstructions: string;

  @Prop()
  tax: number;

  @Prop()
  tip: number;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
