import { firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { UberToken, UberTokenDocument } from '../auth/schemas/uber-token.schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UberProvider {
  constructor(
    @InjectModel(UberToken.name)
    private readonly uberTokenModel: Model<UberTokenDocument>,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async uberApi(config: AxiosRequestConfig, isFirstCheck = true): Promise<any> {
    const token: UberToken = await this.authService.getToken();
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.access_token}`,
    };
    console.log('----------------Request Config----------------', config);
    try {
      const myData = await firstValueFrom(this.httpService.request(config));
      return myData?.data;
    } catch (e) {
      console.error('----------------ERROR----------------', e.response.data);
      return this.repeatedRequest(config, isFirstCheck, e);
    }
  }

  async repeatedRequest(config: AxiosRequestConfig, isFirstCheck: boolean, e) {
    if (
      isFirstCheck &&
      (e.response.status === 401 || e.response.status === 403)
    ) {
      await this.uberTokenModel.deleteMany({});
      return this.uberApi(config, false);
    }
    throw new HttpException(e.response.data.message, e.response.status);
  }
}
