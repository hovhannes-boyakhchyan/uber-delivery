import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Package {
  @Prop({ type: Number })
  bag_count: number;

  @Prop({ type: Number })
  drink_count: number;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
