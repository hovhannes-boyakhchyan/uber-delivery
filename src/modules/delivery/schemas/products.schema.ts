import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Size } from '../../../constants';
import { Dimensions, DimensionsSchema } from './dimensions.schema';

@Schema()
export class Products {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  // @Prop({ enum: Size, default: Size.medium })
  // size: Size;
  //
  // @Prop({ type: DimensionsSchema })
  // dimensions: Dimensions;
  //
  // @Prop({ type: Boolean })
  // must_be_upright: boolean;
  //
  // @Prop({ type: Number })
  // weight: number;
  //
  // @Prop({ type: Number })
  // perishability: number;
  //
  // @Prop({ type: Number })
  // preparation_time: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
