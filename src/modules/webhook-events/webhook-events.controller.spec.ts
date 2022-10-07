import { Test, TestingModule } from '@nestjs/testing';
import { WebhookEventsController } from './webhook-events.controller';

describe('WebhookEventsController', () => {
  let controller: WebhookEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookEventsController],
    }).compile();

    controller = module.get<WebhookEventsController>(WebhookEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
