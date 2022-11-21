import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysController } from './gateway.controller';

describe('GatewaysController', () => {
  let controller: GatewaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewaysController],
    }).compile();

    controller = module.get<GatewaysController>(GatewaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
