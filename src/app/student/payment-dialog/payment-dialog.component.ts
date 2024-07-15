import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentRestControllerService} from "../../services/services/student-rest-controller.service";
import {AddPayment$Params} from "../../services/fn/student-rest-controller/add-payment";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../../shared/notification.service";

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css'] // Corrected the property name to styleUrls
})
export class PaymentDialogComponent implements OnInit {
  display: FormControl = new FormControl("", Validators.required);
  input: any;
  paymentGroup!: FormGroup;
  paymentParams: AddPayment$Params = {
    amount: 0,
    paymentDate: '',
    type: "DEPOSIT",
    status: "CREATED",
    file: undefined
  };

  constructor(private fb: FormBuilder, private studentService: StudentRestControllerService, private dialogRef: MatDialogRef<PaymentDialogComponent>, private snackBar: MatSnackBar, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.paymentGroup = this.fb.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
      paymentType: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  handleFileInputChange(event: Event): void {
    this.input = event.target as HTMLInputElement;
    if (this.input?.files && this.input.files[0]) {
      this.display.patchValue(`${this.input.files[0].name}`);
    }
  }


  addPayment(): void {
    this.paymentParams.amount = this.paymentGroup.get('amount')?.value;
    this.paymentParams.paymentDate = this.paymentGroup.get('date')?.value;
    this.paymentParams.type = this.paymentGroup.get('paymentType')?.value;
    this.paymentParams.file = this.input.files[0];

    this.studentService.addPayment(this.paymentParams).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.snackBar.open('Payment added successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

      },
      error: err => {
        this.snackBar.open('Failed to add Payment' + err.message, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
        console.log(err);
      }
    });
  }
}
