import {
  Controller,
  Res,
  Post,
  Delete,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';

import { DeviceService } from '../services/device-rep/device.service';
import { CreateDeviceDTO } from '../dto/CreateDeviceDTO';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async addDevice(@Body() req: CreateDeviceDTO, @Res() res) {
    try {
      const { idGateway, ...rest } = req;
      const nedDevice = await this.deviceService.addDevice(idGateway, req);
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'Device successfully created!', nedDevice });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  @Delete('/:id')
  async removeDevice(@Param('id') id: string, @Res() res) {
    try {
      const deletedDevice = await this.deviceService.deleteDevice(<string>id);
      res
        .status(HttpStatus.OK)
        .json({ mesage: 'Device successfully deleted!', deletedDevice });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
}
