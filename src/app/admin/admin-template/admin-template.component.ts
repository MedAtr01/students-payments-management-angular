import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../services/token/token.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../shared/notification.service";
import {WebSocketService} from "../../shared/web-socket.service";
import {NotificationControllerService} from "../../services/services/notification-controller.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TitleService} from "../../services/services/title.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit {
  public notifications = 0;
  public notificationList: any[] = [];
  sub?: string;

  constructor(private tokenService: TokenService, private router: Router, private webSocketService: WebSocketService, private notificationService: NotificationService, private notificationControllerService: NotificationControllerService, private snackBar: MatSnackBar, public titleService: TitleService) {


  }


  ngOnInit(): void {

    this.loadNotifications();
    this.webSocketService.connect().subscribe(() => {
      this.webSocketService.subscribe('/topic/notification', (message) => {
        this.notificationList.push(message);

      });
    });
    this.loadAdminDetails();
  }

  loadNotifications() {
    this.notificationService.getAdminNotifications().subscribe(data => {
      this.notificationList = data;
      this.notifications = this.notificationList.length;
    });
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['login'])
  }

  markAsReadAndDelete(id: number) {

    this.notificationControllerService.markAsRead({id: id}).subscribe({
      next: () => {
        this.snackBar.open('Notification deleted', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        })
        this.loadNotifications();
      },
      error: err => {
        this.snackBar.open('Failed to delete notification', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
        console.log(err);
      }

    })
  }

  loadAdminDetails() {
    const token = this.tokenService.getToken();
    const decodedToken = jwtDecode(token);
    this.sub = decodedToken.sub;

  }

  protected readonly document = document;
}
