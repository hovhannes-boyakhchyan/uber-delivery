import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import {
  DeliveryData,
  DeliveryDataSchema,
  Delivery,
  DeliverySchema,
  UpdateDeliveryData,
  UpdateDeliveryDataSchema,
  UpdateDelivery,
  UpdateDeliverySchema,
  CancelDelivery,
  CancelDeliverySchema,
} from './schemas';
import { AuthService } from '../../auth/auth.service';
import {
  UberToken,
  UberTokenSchema,
} from '../../auth/schemas/uber-token.schema';
import { UberProvider } from '../../providers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryData.name, schema: DeliveryDataSchema },
      { name: UberToken.name, schema: UberTokenSchema },
      { name: Delivery.name, schema: DeliverySchema },
      { name: UpdateDeliveryData.name, schema: UpdateDeliveryDataSchema },
      { name: UpdateDelivery.name, schema: UpdateDeliverySchema },
      { name: CancelDelivery.name, schema: CancelDeliverySchema },
    ]),
    HttpModule,
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, AuthService, UberProvider],
})
export class DeliveryModule {}
