import { GatewayMaxDevices } from './custom-validations/max-devices';
import { IsNotEmpty, Validate } from 'class-validator';

export class CreateDeviceDTO {
  @IsNotEmpty()
  uid: number;

  @IsNotEmpty()
  vendor: string;

  createAt: Date;

  @IsNotEmpty()
  status: string;

  @Validate(GatewayMaxDevices)
  idGateway: string;
}
