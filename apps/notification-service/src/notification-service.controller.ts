import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationServiceService } from './notification-service.service';
import {
  SendNotificationRequest,
  BroadcastNotificationRequest,
  BroadcastNotificationResponse,
  GetNotificationsRequest,
  MarkAsReadRequest,
  MarkAllAsReadRequest,
  GetUnreadCountRequest,
  GetAllUserIdsRequest,
  GetAllUserIdsResponse,
  NotificationResponse,
  NotificationsListResponse,
  UnreadCountResponse,
  NOTIFICATION_SERVICE_NAME,
} from 'types/notification/notification';

@Controller()
export class NotificationServiceController {
  constructor(
    private readonly notificationService: NotificationServiceService,
  ) {}

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'SendNotification')
  async sendNotification(
    request: SendNotificationRequest,
  ): Promise<NotificationResponse> {
    return this.notificationService.sendNotification(request);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'GetNotifications')
  async getNotifications(
    request: GetNotificationsRequest,
  ): Promise<NotificationsListResponse> {
    return this.notificationService.getNotifications(request);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'MarkAsRead')
  async markAsRead(request: MarkAsReadRequest): Promise<NotificationResponse> {
    return this.notificationService.markAsRead(request);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'MarkAllAsRead')
  async markAllAsRead(
    request: MarkAllAsReadRequest,
  ): Promise<NotificationResponse> {
    return this.notificationService.markAllAsRead(request);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'GetUnreadCount')
  async getUnreadCount(
    request: GetUnreadCountRequest,
  ): Promise<UnreadCountResponse> {
    return this.notificationService.getUnreadCount(request);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'BroadcastNotification')
  async broadcastNotification(
    request: BroadcastNotificationRequest,
  ): Promise<BroadcastNotificationResponse> {
    return this.notificationService.broadcastNotification(request);
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'GetAllUserIds')
  async getAllUserIds(
    request: GetAllUserIdsRequest,
  ): Promise<GetAllUserIdsResponse> {
    return this.notificationService.getAllUserIds(request);
  }
}
