import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AddressSchema, Address } from '../../../schemas/address.schema';
import { Verification, VerificationSchema } from './verification.schema';
import { Products, ProductsSchema } from './products.schema';
import {
  UndeliverableAction,
  UndeliverableActionSchema,
} from './undeliverable-action.schema';
import { DeliverableAction } from '../../../constants';

export type DeliveryDataDocument = DeliveryData & Document;

@Schema({
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  strict: false,
})
export class DeliveryData {
  @Prop({ auto: true })
  _id!: mongoose.Schema.Types.ObjectId;

  @Prop({ type: AddressSchema, required: true })
  pickupAddress: Address;

  @Prop({ type: AddressSchema, required: true })
  dropoffAddress: Address;

  @Prop({ required: true, set: (v) => v.replace('+', '') })
  dropoffPhoneNumber: string;

  @Prop({ required: true })
  dropoffName: string;

  @Prop()
  dropoffInstructions: string;

  @Prop()
  pickupInstructions: string;

  @Prop({ required: true, set: (v) => v.replace('+', '') })
  pickupPhoneNumber: string;

  @Prop()
  pickupStartTime: string;

  @Prop({ set: (v) => Math.round(v * 100) }) // in cents
  orderValue: number;

  @Prop()
  itemsCount: number;

  @Prop({ set: (v) => Math.round(v * 100) }) // in cents
  tip: number;

  @Prop({ type: [ProductsSchema], required: true })
  products: Products[];

  @Prop()
  externalStoreId: string;

  @Prop()
  deliveryExternalReference: string;

  @Prop()
  pickupBusinessName: string;

  @Prop()
  controlledContents: string;

  // @Prop({ enum: DeliverableAction })
  // deliverable_action: DeliverableAction;
  //
  // @Prop()
  // dropoff_business_name: string;
  //
  // @Prop()
  // dropoff_latitude: number;
  //
  // @Prop()
  // dropoff_longitude: number;
  //
  // @Prop()
  // dropoff_seller_notes: string;
  //
  // @Prop({ type: VerificationSchema })
  // dropoff_verification: Verification;
  //
  // @Prop()
  // manifest_reference: string;
  //
  // @Prop()
  // pickup_latitude: number;
  //
  // @Prop()
  // pickup_longitude: number;
  //
  // @Prop({ type: VerificationSchema })
  // pickup_verification: Verification;
  //
  // @Prop()
  // quote_id: string;
  //
  // @Prop({ type: UndeliverableActionSchema })
  // undeliverable_action: UndeliverableAction;
  //
  // @Prop()
  // pickup_deadline_dt: string;
  //
  // @Prop()
  // dropoff_ready_dt: string;
  //
  // @Prop()
  // dropoff_deadline_dt: string;
  //
  // @Prop()
  // idempotency_key: string;
  //
  // @Prop({ type: VerificationSchema })
  // return_verification: Verification;
}

export const DeliveryDataSchema = SchemaFactory.createForClass(DeliveryData);
