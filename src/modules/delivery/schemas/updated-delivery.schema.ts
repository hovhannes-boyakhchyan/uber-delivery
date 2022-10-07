import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UpdateDeliveryData } from './update-delivery-data.schema';

export type UpdateDeliveryDocument = UpdateDelivery & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  strict: false,
})
export class UpdateDelivery {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UpdateDeliveryData' })
  update_delivery_data: UpdateDeliveryData;
}

export const UpdateDeliverySchema =
  SchemaFactory.createForClass(UpdateDelivery);
