import { GateWayIsUnique } from './custom-validations/uniqSerialGatewayNumber';
import { IsNotEmpty, Matches, Validate } from 'class-validator';

export class CreateGatewayDTO {
  @IsNotEmpty()
  @Validate(GateWayIsUnique)
  serialNumber: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    {
      message: 'IPV4 address is not valid!',
    },
  )
  ipV4: string;
}
