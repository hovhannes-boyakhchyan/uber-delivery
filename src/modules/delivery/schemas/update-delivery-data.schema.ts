import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type UpdateDeliveryDataDocument = UpdateDeliveryData & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
})
export class UpdateDeliveryData {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop()
  dropoff_notes: string;

  @Prop()
  dropoff_seller_notes: string;

  @Prop()
  manifest_reference: string;

  @Prop()
  pickup_notes: string;

  @Prop()
  requires_dropoff_signature: boolean;

  @Prop()
  requires_id: boolean;

  @Prop()
  tip_by_customer: number;
}

export const UpdateDeliveryDataSchema =
  SchemaFactory.createForClass(UpdateDeliveryData);
