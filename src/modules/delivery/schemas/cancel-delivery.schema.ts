import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CancelDeliveryDocument = CancelDelivery & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  strict: false,
})
export class CancelDelivery {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;
}

export const CancelDeliverySchema =
  SchemaFactory.createForClass(CancelDelivery);
