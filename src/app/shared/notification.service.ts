import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {NotificationControllerService} from "../services/services/notification-controller.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: string[] = [];

  constructor(private notificationControllerService: NotificationControllerService) {
  }

  getAdminNotifications(): Observable<any[]> {
    return this.notificationControllerService.getAdminNotifications();
  }

  getStudentNotifications(studentCode: string): Observable<any[]> {
    return this.notificationControllerService.getStudentNotifications({studentCode});
  }

  addNotification(notification: string) {
    this.notifications.push(notification);
    this.saveNotifications();
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  markAsRead(id: number) {
    return this.notificationControllerService.markAsRead({id});
  }

  private saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }


  private loadNotifications() {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
    }
  }
}
