import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Pincode {
  @Prop({ type: Boolean, required: true })
  enabled: boolean;

  @Prop({ type: String, required: true })
  value: string;
}

export const PincodeSchema = SchemaFactory.createForClass(Pincode);
