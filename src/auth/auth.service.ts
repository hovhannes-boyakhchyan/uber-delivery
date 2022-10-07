import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import * as moment from 'moment';
import { UberToken, UberTokenDocument } from './schemas/uber-token.schema';
import { IAccessTokenInterface } from './interfaces';
import { tokenExpiresIn } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UberToken.name)
    private readonly uberTokenModel: Model<UberTokenDocument>,
    private readonly httpService: HttpService,
  ) {}

  async getToken(): Promise<UberToken> {
    const token = await this.uberTokenModel.findOne({}).sort({ _id: -1 });

    if (!token || token.expiry_date < moment().valueOf()) {
      const newToken: AxiosResponse<IAccessTokenInterface> =
        await this.generateAccessToken();

      return this.uberTokenModel.create({
        ...newToken,
        expiry_date: moment().add(tokenExpiresIn, 'day').valueOf(),
      });
    }

    return token;
  }

  generateAccessToken(): Promise<AxiosResponse<IAccessTokenInterface>> {
    const formData = new FormData();
    formData.append('client_id', process.env.UBER_CLIENT_ID);
    formData.append('client_secret', process.env.UBER_CLIENT_SECRET);
    formData.append('grant_type', 'client_credentials');
    formData.append('scope', 'eats.deliveries');

    const config: AxiosRequestConfig = {
      url: process.env.UBER_ACCESS_TOKEN_URI,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    return firstValueFrom(
      this.httpService.request(config).pipe(
        catchError((e) => {
          throw new HttpException(e.response.data.error, e.response.status);
        }),
        map((res) => res.data),
      ),
    );
  }
}
