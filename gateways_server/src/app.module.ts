import { Module } from '@nestjs/common';
import { GatewayModule } from './gateways/gateway.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GatewayModule,
    MongooseModule.forRoot('mongodb://localhost/gateway_app'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
