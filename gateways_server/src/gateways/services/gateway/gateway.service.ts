import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gateway } from '../../interfaces/gateway.interface';
import { CreateGatewayDTO } from '../../dto/CreateGatewayDTO';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel('Gateway') private readonly gatewayModel: Model<Gateway>,
  ) {}

  async getGateways(): Promise<Gateway[]> {
    const allGateways = await this.gatewayModel
      .find({
        isDeleted: false,
      })
      .populate({
        path: 'devices',
        match: { isDeleted: false },
      });
    return allGateways;
  }

  async getGateway(id: string): Promise<Gateway> {
    const selectedGateway = await this.gatewayModel.findById(id).populate({
      path: 'devices',
      match: { isDeleted: false },
    });
    return selectedGateway;
  }

  async createGateway(createProductDTO: CreateGatewayDTO): Promise<Gateway> {
    const newGateway = new this.gatewayModel(createProductDTO);
    return await newGateway.save();
  }

  async deleteGateway(id: string): Promise<Gateway> {
    const deleteGateway = await this.gatewayModel
      .findByIdAndUpdate(id, { isDeleted: true })
      .populate({
        path: 'devices',
        match: { isDeleted: false },
      });
    return deleteGateway;
  }

  async updateGateway(
    id: string,
    createProductDTO: CreateGatewayDTO,
  ): Promise<Gateway> {
    const updatedGateway = this.gatewayModel
      .findByIdAndUpdate(id, createProductDTO, { new: true })
      .populate({
        path: 'devices',
        match: { isDeleted: false },
      });
    return updatedGateway;
  }

  async findById(idGateWay): Promise<Gateway> {
    const foundGateway = await this.gatewayModel.findById(idGateWay).populate({
      path: 'devices',
      match: { isDeleted: false },
    });
    return foundGateway;
  }

  async getNumberDevice(idGateWay): Promise<number> {
    const gateway = await this.gatewayModel.findById(idGateWay).populate({
      path: 'devices',
      match: { isDeleted: false },
    });
    if (gateway) return gateway.devices.length;
    return 0;
  }

  async findBySN(serialNumber): Promise<Gateway> {
    const gatewayBySerialNumber = await this.gatewayModel
      .findOne({
        serialNumber,
      })
      .populate({
        path: 'devices',
        match: { isDeleted: false },
      });
    return gatewayBySerialNumber;
  }
}
