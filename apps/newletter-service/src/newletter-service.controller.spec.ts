import { Test, TestingModule } from '@nestjs/testing';
import { NewletterServiceController } from './newletter-service.controller';
import { NewletterServiceService } from './newletter-service.service';

describe('NewletterServiceController', () => {
  let newletterServiceController: NewletterServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NewletterServiceController],
      providers: [NewletterServiceService],
    }).compile();

    newletterServiceController = app.get<NewletterServiceController>(NewletterServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(newletterServiceController.getHello()).toBe('Hello World!');
    });
  });
});
