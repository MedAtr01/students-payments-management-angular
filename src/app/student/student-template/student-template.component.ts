import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StudentDataService} from '../services/student-data.service';
import {TokenService} from '../../services/token/token.service';
import {Router} from '@angular/router';
import {NotificationControllerService} from '../../services/services/notification-controller.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StudentRestControllerService} from '../../services/services/student-rest-controller.service';
import {Student} from "../../services/models/student";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";
import {NotificationService} from "../../shared/notification.service";

@Component({
  selector: 'app-student-template',
  templateUrl: './student-template.component.html',
  styleUrls: ['./student-template.component.css']
})
export class StudentTemplateComponent implements OnInit {
  student: Student = {};
  public notifications = 0;
  public notificationList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private studentDataService: StudentDataService,
    private tokenService: TokenService,
    private router: Router,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private studentService: StudentRestControllerService
  ) {
  }

  ngOnInit(): void {

    this.studentDataService.loadStudent().subscribe(student => {
      this.student = student!;
      this.loadNotifications();
    });
  }

  loadNotifications() {
    if (this.student && this.student.studentCode) {
      const studentCode = this.student.studentCode;
      this.notificationService.getStudentNotifications(studentCode).subscribe({
        next: (notifications) => {
          this.notificationList = notifications;
          this.notifications = this.notificationList.length;
        },
        error: (err) => console.error(err)
      });
    }
  }

  openDialogue() {
    this.dialog.open(PaymentDialogComponent);
  }

  markAsReadAndDelete(id: number) {
    this.notificationService.markAsRead(id).subscribe({
      next: () => {
        this.snackBar.open('Notification deleted', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadNotifications();
      },
      error: err => {
        this.snackBar.open('Failed to delete notification', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error(err);
      }
    });
  }

  protected readonly document = document;

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['login']);
  }
}
