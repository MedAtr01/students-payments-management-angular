import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminRestControllerService} from "../../services/services/admin-rest-controller.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-student-password-dialog',
  templateUrl: './update-student-password-dialog.component.html',
  styleUrls: ['./update-student-password-dialog.component.css']
})
export class UpdateStudentPasswordDialogComponent implements OnInit {
  hideNew: boolean = true;
  hideConfirm: boolean = true;
  passwordUpdateGroup!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { username: string },
              private dialogRef: MatDialogRef<UpdateStudentPasswordDialogComponent>,
              private fb: FormBuilder,
              private adminService: AdminRestControllerService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.passwordUpdateGroup = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordsMatchValidator});

  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword ? {passwordMismatch: true} : null;
  }

  togglePasswordVisibility(field: 'hideNew' | 'hideConfirm'): void {
    this[field] = !this[field];
  }

  onConfirmPasswordBlur(): void {
    this.passwordUpdateGroup.updateValueAndValidity();
  }

  updatePassword(): void {
    const password: string = this.passwordUpdateGroup.get('newPassword')?.value;
    this.adminService.updateStudentPassword(this.data.username, password).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.snackBar.open('Password updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: err => {
        this.snackBar.open('Failed to update password: ' + err.message, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error(err);
      }
    });
  }
}
