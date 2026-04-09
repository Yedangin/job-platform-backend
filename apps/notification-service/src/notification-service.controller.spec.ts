import { Test, TestingModule } from '@nestjs/testing';
import { NotificationServiceController } from './notification-service.controller';
import { NotificationServiceService } from './notification-service.service';

jest.mock('./notification-service.service', () => ({
  NotificationServiceService: class NotificationServiceService {},
}));

jest.mock(
  'types/notification/notification',
  () => ({
    NOTIFICATION_SERVICE_NAME: 'NotificationService',
  }),
  { virtual: true },
);

describe('NotificationServiceController', () => {
  let controller: NotificationServiceController;
  let service: {
    sendNotification: jest.Mock;
    getNotifications: jest.Mock;
    markAsRead: jest.Mock;
    markAllAsRead: jest.Mock;
    getUnreadCount: jest.Mock;
    broadcastNotification: jest.Mock;
    getAllUserIds: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      sendNotification: jest.fn(),
      getNotifications: jest.fn(),
      markAsRead: jest.fn(),
      markAllAsRead: jest.fn(),
      getUnreadCount: jest.fn(),
      broadcastNotification: jest.fn(),
      getAllUserIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationServiceController],
      providers: [{ provide: NotificationServiceService, useValue: service }],
    }).compile();

    controller = module.get<NotificationServiceController>(
      NotificationServiceController,
    );
  });

  it('delegates SendNotification to service', async () => {
    const request = { userId: 'u1', title: 'hello' } as any;
    const response = { success: true } as any;
    service.sendNotification.mockResolvedValue(response);

    await expect(controller.sendNotification(request)).resolves.toBe(response);
    expect(service.sendNotification).toHaveBeenCalledWith(request);
  });

  it('delegates GetUnreadCount to service', async () => {
    const request = { userId: 'u1' } as any;
    const response = { count: 3 } as any;
    service.getUnreadCount.mockResolvedValue(response);

    await expect(controller.getUnreadCount(request)).resolves.toBe(response);
    expect(service.getUnreadCount).toHaveBeenCalledWith(request);
  });
});
