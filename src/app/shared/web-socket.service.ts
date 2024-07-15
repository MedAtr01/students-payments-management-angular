import {Injectable} from '@angular/core';
import {Client, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Observable} from 'rxjs';
import {NotificationService} from "./notification.service";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;

  constructor(private notificationService: NotificationService) {
    const socket = new SockJS(`${environment.rootUrl}/ws`);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000, // Auto reconnect every 5 seconds
    });
  }

  connect(): Observable<void> {
    return new Observable(observer => {
      this.stompClient.onConnect = () => {
        observer.next();
        observer.complete();
      };

      this.stompClient.onStompError = (frame) => {
        observer.error(frame);
      };

      this.stompClient.activate();
    });
  }

  subscribe(topic: string, callback: (message: any) => void): void {
    this.stompClient.subscribe(topic, (message) => {
      const notification = JSON.parse(message.body);
      this.notificationService.addNotification(notification.message);
      callback(notification);
    });
  }
}
