import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Identification {
  @Prop({ type: Number })
  min_age: number;
}

export const IdentificationSchema =
  SchemaFactory.createForClass(Identification);
