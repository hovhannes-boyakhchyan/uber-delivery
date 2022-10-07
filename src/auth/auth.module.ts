import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UberToken, UberTokenSchema } from './schemas/uber-token.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UberToken.name, schema: UberTokenSchema },
    ]),
    HttpModule,
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
