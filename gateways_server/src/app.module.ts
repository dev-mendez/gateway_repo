import { Module } from '@nestjs/common';
import { GatewayModule } from './gateways/gateway.module';
import { MongooseModule } from '@nestjs/mongoose';
import env from './config/env-config';

@Module({
  imports: [GatewayModule, MongooseModule.forRoot(env.MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
