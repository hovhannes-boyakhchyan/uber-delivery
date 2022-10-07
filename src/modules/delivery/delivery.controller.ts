import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import {
  CancelDelivery,
  Delivery,
  DeliveryData,
  UpdateDeliveryData,
} from './schemas';
import { DeliveryDataDto, UpdateDeliveryDto, GetDeliveryListDto } from './dto';
import { CreateDeliveryResponseDto } from './dto/create-delivery-response.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('/create')
  async createDelivery(
    @Body() deliveryDataDto: DeliveryDataDto,
  ): Promise<CreateDeliveryResponseDto> {
    console.log('----------Create Delivery Data-----------', deliveryDataDto);
    const deliveryData: DeliveryData =
      await this.deliveryService.saveDeliveryData(deliveryDataDto);
    const delivery: Delivery = await this.deliveryService.create(deliveryData);
    const response: CreateDeliveryResponseDto = {
      deliveryId: delivery.delivery_id,
      debug: delivery.debug,
    };
    console.log('----------Create Delivery Response----------', response);

    return response;
  }

  @Get('/:id')
  async getDelivery(@Param('id') deliveryId: string): Promise<any> {
    return this.deliveryService.getDelivery(deliveryId);
  }

  @Patch('/update/:id')
  async updateDelivery(
    @Param('id') deliveryId: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    const updatedDeliveryData: UpdateDeliveryData =
      await this.deliveryService.saveUpdatedData(updateDeliveryDto);
    return this.deliveryService.update(deliveryId, updatedDeliveryData);
  }

  @Post('/cancel/:id')
  cancel(@Param('id') deliveryId: string): Promise<CancelDelivery> {
    return this.deliveryService.cancel(deliveryId);
  }

  @Get('/list/deliveries')
  getDeliveryList(@Query() query: GetDeliveryListDto): Promise<any> {
    return this.deliveryService.getDeliveryList(query);
  }
}
