import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop({ required: true, index: true })
  uid: number;

  @Prop({ required: true })
  vendor: string;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ required: true })
  status: Boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  idGateway: string;

  @Prop({ default: false })
  isDeleted: Boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
