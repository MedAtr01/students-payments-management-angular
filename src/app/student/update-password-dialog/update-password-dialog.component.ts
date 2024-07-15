import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {UserRestControllerService} from '../../services/services/user-rest-controller.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.css']
})
export class UpdatePasswordDialogComponent implements OnInit {
  passwordUpdateGroup!: FormGroup;
  hideCurrent = true;
  hideNew = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserRestControllerService,
    private dialogRef: MatDialogRef<UpdatePasswordDialogComponent>,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.passwordUpdateGroup = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validators: this.passwordMatchValidator
    });
  }

  togglePasswordVisibility(field: 'hideCurrent' | 'hideNew' | 'hideConfirm') {
    if (field === 'hideCurrent') {
      this.hideCurrent = !this.hideCurrent;
    } else if (field === 'hideNew') {
      this.hideNew = !this.hideNew;
    } else if (field === 'hideConfirm') {
      this.hideConfirm = !this.hideConfirm;
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (!newPassword || !confirmPassword) {
      return null;
    }
    return newPassword.value === confirmPassword.value ? null : {passwordMismatch: true};
  }

  onConfirmPasswordBlur() {
    const confirmPasswordControl = this.passwordUpdateGroup.get('confirmPassword');
    if (confirmPasswordControl) {
      confirmPasswordControl.markAsTouched();
      this.passwordUpdateGroup.updateValueAndValidity();
    }
  }


  updatePassword() {
    if (this.passwordUpdateGroup.valid) {
      const {currentPassword, newPassword} = this.passwordUpdateGroup.value;
      this.userService.updatePassword({body: {currentPassword, newPassword}}).subscribe({
        next: () => {
          this.snackBar.open('Password updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: err => {
          if (err.status === 401) { // Unauthorized
            this.snackBar.open('Current password is incorrect. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['alert-succes']
            });
          } else {
            this.snackBar.open(`Error updating password: ${err.message}`, 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        }
      });
    }
  }
}
