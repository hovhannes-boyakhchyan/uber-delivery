import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { DeliveryData } from './create-delivery-data.schema';

export type DeliveryDocument = Delivery & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  strict: false,
})
export class Delivery {
  @Prop()
  delivery_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryData' })
  delivery_data: DeliveryData;

  @Prop({ type: Object })
  debug: any;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
