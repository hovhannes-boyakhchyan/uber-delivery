import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BarcodeTypes } from '../../../constants';

@Schema()
export class Barcodes {
  @Prop({ type: String })
  value: string;

  @Prop({ enum: BarcodeTypes })
  type: BarcodeTypes;
}

export const BarcodesSchema = SchemaFactory.createForClass(Barcodes);
