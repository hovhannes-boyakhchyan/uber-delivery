import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Dimensions {
  @Prop({ type: Number })
  length: number;

  @Prop({ type: Number })
  height: number;

  @Prop({ type: Number })
  depth: number;
}

export const DimensionsSchema = SchemaFactory.createForClass(Dimensions);
