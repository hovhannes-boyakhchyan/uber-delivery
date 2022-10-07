import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UndeliverableAction {
  @Prop({ type: String })
  leave_at_door: string;

  @Prop({ type: String })
  return: string;
}

export const UndeliverableActionSchema =
  SchemaFactory.createForClass(UndeliverableAction);
