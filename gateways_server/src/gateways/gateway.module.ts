import { GatewayController } from './controllers/gateways/gateway.controller';
import { DeviceController } from './controllers/devices/device.controller';
import { GatewayMaxDevices } from './dto/custom-validations/maxNumDevices';
import { GateWayIsUnique } from './dto/custom-validations/uniqSerialGatewayNumber';
import { GatewayService } from './services/gateway/gateway.service';
import { DeviceService } from './services/device/device.service';
import { GateWaySchema } from './schemas/gateway.schema';
import { DeviceSchema } from './schemas/device.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Gateway',
        schema: GateWaySchema,
      },
      {
        name: 'Device',
        schema: DeviceSchema,
      },
    ]),
  ],
  controllers: [DeviceController, GatewayController],
  providers: [
    GatewayService,
    DeviceService,
    GatewayMaxDevices,
    GateWayIsUnique,
  ],
})
export class GatewayModule {}
