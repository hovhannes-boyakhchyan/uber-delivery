import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosRequestConfig } from 'axios';
import {
  CancelDelivery,
  CancelDeliveryDocument,
  Delivery,
  DeliveryData,
  DeliveryDataDocument,
  DeliveryDocument,
  UpdateDelivery,
  UpdateDeliveryData,
  UpdateDeliveryDataDocument,
  UpdateDeliveryDocument,
} from './schemas';
import {
  CreateDeliveryDto,
  DeliveryDataDto,
  GetDeliveryListDto,
  ManifestItemDto,
  UpdateDeliveryDto,
} from './dto';
import { AddressProvider, UberProvider } from '../../providers';
import { Products } from './schemas/products.schema';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(DeliveryData.name)
    private readonly deliveryDataModel: Model<DeliveryDataDocument>,
    @InjectModel(Delivery.name)
    private readonly deliveryModel: Model<DeliveryDocument>,
    @InjectModel(UpdateDeliveryData.name)
    private readonly updateDeliveryDataModel: Model<UpdateDeliveryDataDocument>,
    @InjectModel(UpdateDelivery.name)
    private readonly updateDeliveryModel: Model<UpdateDeliveryDocument>,
    @InjectModel(CancelDelivery.name)
    private readonly cancelDelivery: Model<CancelDeliveryDocument>,
    private readonly uberProvider: UberProvider,
  ) {}

  async saveDeliveryData(
    deliveryDataDto: DeliveryDataDto,
  ): Promise<DeliveryData> {
    const deliveryData = await this.deliveryDataModel.create(deliveryDataDto);
    return deliveryData.toObject();
  }

  saveUpdatedData(
    updatedDeliveryDto: UpdateDeliveryDto,
  ): Promise<UpdateDeliveryData> {
    return this.updateDeliveryDataModel.create(updatedDeliveryDto);
  }

  async create(deliveryData: DeliveryData): Promise<Delivery> {
    const config: AxiosRequestConfig = {
      url: process.env.API_CREATE_DELIVERY.replace(
        'customer_id',
        process.env.UBER_CUSTOMER_ID,
      ),
      method: 'POST',
      data: this.mappingDeliveryData(deliveryData),
    };

    const delivery = await this.uberProvider.uberApi(config);

    return this.deliveryModel.create({
      delivery_id: delivery.id,
      delivery_data: deliveryData._id,
      debug: {
        ...delivery,
      },
    });
  }

  private mappingDeliveryData(data: DeliveryData): CreateDeliveryDto {
    const dropoff_address: string = AddressProvider.generateFullAddress(
      data.dropoffAddress,
    );
    const pickup_address: string = AddressProvider.generateFullAddress(
      data.pickupAddress,
    );

    const deliveryData: CreateDeliveryDto = {
      dropoff_address,
      pickup_address,
      dropoff_name: data.dropoffName,
      dropoff_phone_number: data.dropoffPhoneNumber,
      manifest_items: this.collectManifestItems(data.products),
      pickup_name: data.pickupBusinessName,
      pickup_phone_number: data.pickupPhoneNumber,
      dropoff_notes: data.dropoffInstructions,
      manifest_total_value: Math.round(data.orderValue),
      pickup_business_name: data.pickupBusinessName,
      pickup_notes: data.pickupInstructions,
      pickup_ready_dt: data.pickupStartTime,
      tip: Math.round(data.tip),
      external_store_id: data.externalStoreId,
    };

    return deliveryData;
  }

  private collectManifestItems(products: Products[]): ManifestItemDto[] {
    const manifestItems: ManifestItemDto[] = products.map((product) => {
      return {
        name: product.title,
        quantity: product.quantity,
      };
    });

    return manifestItems;
  }

  getDelivery(deliveryId: string): Promise<any> {
    const config: AxiosRequestConfig = {
      url: process.env.API_GET_DELIVERY.replace(
        'customer_id',
        process.env.UBER_CUSTOMER_ID,
      ).replace('delivery_id', deliveryId),
      method: 'GET',
    };

    return this.uberProvider.uberApi(config);
  }

  async update(
    deliveryId: string,
    updatedDeliveryData: UpdateDeliveryData,
  ): Promise<UpdateDelivery> {
    const config: AxiosRequestConfig = {
      url: process.env.API_GET_DELIVERY.replace(
        'customer_id',
        process.env.UBER_CUSTOMER_ID,
      ).replace('delivery_id', deliveryId),
      method: 'POST',
      data: updatedDeliveryData,
    };

    const updatedDelivery = await this.uberProvider.uberApi(config);
    console.log('------------Delivery Updated-------------', updatedDelivery);

    return this.updateDeliveryModel.create({
      ...updatedDelivery,
      delivery_id: updatedDelivery.id,
      update_delivery_data: updatedDeliveryData._id,
    });
  }

  async cancel(deliveryId: string): Promise<CancelDelivery> {
    const config: AxiosRequestConfig = {
      url: process.env.API_CANCEL_DELIVERY.replace(
        'customer_id',
        process.env.UBER_CUSTOMER_ID,
      ).replace('delivery_id', deliveryId),
      method: 'POST',
      data: {},
    };

    const canceledDelivery = await this.uberProvider.uberApi(config);
    console.log('------------Delivery Canceled-------------', canceledDelivery);

    return this.cancelDelivery.create(canceledDelivery);
  }

  async getDeliveryList(query: GetDeliveryListDto): Promise<any> {
    const { filter, limit, offset } = query;
    const config: AxiosRequestConfig = {
      url:
        process.env.API_GET_DELIVERY_LIST.replace(
          'customer_id',
          process.env.UBER_CUSTOMER_ID,
        ) + `?filter=${filter}&limit=${limit}&offset=${offset}`,
      method: 'GET',
    };

    return this.uberProvider.uberApi(config);
  }
}
