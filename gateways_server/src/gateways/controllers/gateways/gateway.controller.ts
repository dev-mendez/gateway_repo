import {
  Controller,
  Res,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { GatewayService } from '../../services/gateway/gateway.service';
import { CreateGatewayDTO } from '../../dto/CreateGatewayDTO';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('/')
  async getGateways(@Res() res) {
    try {
      const gateways = await this.gatewayService.getGateways();
      return res.status(HttpStatus.OK).json({
        message: 'Gateways fetched!',
        gateways,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  @Post('/create')
  async createGateway(@Body() createGatewayDTO: CreateGatewayDTO, @Res() res) {
    try {
      const newGateway = await this.gatewayService.createGateway(
        createGatewayDTO,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Gateway successfully created!',
        newGateway,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  @Get('/:id')
  async getGateway(@Res() res, @Param('id') id: string) {
    try {
      const gateway = await this.gatewayService.getGateway(<string>id);
      if (!gateway) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Gateway not found! :',
        });
      }
      if (gateway.isDeleted) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Gateway not found! :',
        });
      }
      return res.status(HttpStatus.OK).json({
        gateway,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  // @Put('/update/:id')
  // async updateGateway(
  //   @Body() createGatewayDTO: CreateGatewayDTO,
  //   @Res() res,
  //   @Param('id') id: string,
  // ) {
  //   try {
  //     const updatedGateway = await this.gatewayService.updateGateway(
  //       <string>id,
  //       <CreateGatewayDTO>createGatewayDTO,
  //     );

  //     return res.status(HttpStatus.OK).json({
  //       message: 'Gateway successfully updated! :)',
  //       updatedGateway,
  //     });
  //   } catch (err) {
  //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  //   }
  // }

  @Delete('/delete/:id')
  async deleteGateway(@Res() res, @Param('id') id: string) {
    try {
      const gatewayDeleted = await this.gatewayService.deleteGateway(
        <string>id,
      );
      if (gatewayDeleted.isDeleted) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Gateway is already deleted! :',
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Gateway successfully deleted!',
        gatewayDeleted,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
}
