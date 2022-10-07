import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Barcodes, BarcodesSchema } from './barcodes.schema';
import { Pincode, PincodeSchema } from './pincode.schema';
import { Package, PackageSchema } from './package.schema';
import { Identification, IdentificationSchema } from './identification.schema';

@Schema()
export class Verification {
  @Prop({ type: Boolean })
  signature: boolean;

  @Prop({ type: [BarcodesSchema] })
  barcodes: Barcodes[];

  @Prop({ type: PincodeSchema })
  pincode: Pincode;

  @Prop({ type: PackageSchema })
  package: Package;

  @Prop({ type: IdentificationSchema })
  identification: Identification;

  @Prop({ type: Boolean })
  picture: boolean;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
