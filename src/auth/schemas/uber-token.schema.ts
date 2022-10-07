import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UberTokenDocument = UberToken & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
})
export class UberToken {
  @Prop({ required: true })
  access_token: string;

  @Prop({ default: 'Bearer' })
  token_type: string;

  @Prop({ required: true })
  expiry_date: number; //timeStamp

  @Prop({ default: 'eats.deliveries' })
  scope: string;
}

export const UberTokenSchema = SchemaFactory.createForClass(UberToken);
