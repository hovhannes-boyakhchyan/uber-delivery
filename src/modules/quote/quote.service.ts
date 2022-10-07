import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosRequestConfig } from 'axios';
import {
  Quote,
  QuoteDocument,
  ResponseQuote,
  ResponseQuoteDocument,
} from './schemas';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { AddressProvider, UberProvider } from '../../providers';
import { CreateQuotDataDto } from './dto/create-quot-data.dto';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name)
    private readonly quoteModel: Model<QuoteDocument>,
    @InjectModel(ResponseQuote.name)
    private readonly responseQuoteModel: Model<ResponseQuoteDocument>,
    private readonly uberProvider: UberProvider,
  ) {}

  async saveQuoteData(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const quoteData = await this.quoteModel.create(createQuoteDto);
    return quoteData.toObject();
  }

  async create(quoteData: Quote): Promise<ResponseQuote> {
    const config: AxiosRequestConfig = {
      url: process.env.API_GET_QUOTE.replace(
        'customer_id',
        process.env.UBER_CUSTOMER_ID,
      ),
      method: 'POST',
      data: this.mappingQuoteData(quoteData),
    };
    const quote = await this.uberProvider.uberApi(config);

    const responseQuote = await this.responseQuoteModel.create({
      ...quote,
      quoteId: quote.id,
      quoteRequestId: quoteData._id,
    });

    return responseQuote.toObject();
  }

  private mappingQuoteData(data: Quote): CreateQuotDataDto {
    const dropoff_address: string = AddressProvider.generateFullAddress(
      data.dropoffAddress,
    );
    const pickup_address: string = AddressProvider.generateFullAddress(
      data.pickupAddress,
    );

    const quoteData: CreateQuotDataDto = {
      dropoff_address,
      pickup_address,
      dropoff_phone_number: data.dropoffPhoneNumber,
      pickup_latitude: data.pickupAddress.latitude,
      pickup_longitude: data.pickupAddress.longitude,
      pickup_phone_number: data.pickupPhoneNumber,
      pickup_ready_dt: data.pickupStartTime,
      manifest_total_value: Math.round(data.orderValue),
      external_store_id: data.externalStoreId,
    };

    return quoteData;
  }
}
