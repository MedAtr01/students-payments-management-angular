import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  addPaymentToStudent$FormData,
  AddPaymentToStudent$FormData$Params
} from "../../services/fn/admin-rest-controller/add-payment-to-student-form-data";
import {AdminRestControllerService} from "../../services/services/admin-rest-controller.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-payment-student-dialog',
  templateUrl: './add-payment-student-dialog.component.html',
  styleUrl: './add-payment-student-dialog.component.css'
})
export class AddPaymentStudentDialogComponent implements OnInit {
  input: any;
  studentCode: string = '';
  display: FormControl = new FormControl("", Validators.required);
  paymentGroup!: FormGroup;
  paymentParams: AddPaymentToStudent$FormData$Params = {
    code: this.studentCode,
    amount: 0,
    paymentDate: '',
    type: "DEPOSIT",
    status: "CREATED",
    file: undefined
  };


  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                studentCode: string
              },
              private dialogRef: MatDialogRef<AddPaymentStudentDialogComponent>,
              private fb: FormBuilder, private route: ActivatedRoute,
              private adminService: AdminRestControllerService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.paymentGroup = this.fb.group({
      studentCode: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      paymentType: ['', Validators.required],
      file: ['', Validators.required]
    });

    this.studentCode = this.data.studentCode;


    this.paymentGroup.patchValue({studentCode: this.studentCode})

  }

  addPaymentToStudent(code: string) {
    this.paymentParams.code = this.paymentGroup.get('studentCode')?.value;
    this.paymentParams.amount = this.paymentGroup.get('amount')?.value;
    this.paymentParams.paymentDate = this.paymentGroup.get('date')?.value;
    this.paymentParams.type = this.paymentGroup.get('paymentType')?.value;
    this.paymentParams.file = this.input.files[0];

    this.adminService.addPaymentToStudent$FormData(this.paymentParams).subscribe({
      next: value => {
        this.dialogRef.close(true);
        this.snackBar.open('Payment added successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        })


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

  handleFileInputChange(event: Event): void {
    this.input = event.target as HTMLInputElement;
    if (this.input?.files && this.input.files[0]) {
      this.display.patchValue(`${this.input.files[0].name}`);
    }
  }

  protected readonly addPaymentToStudent$FormData = addPaymentToStudent$FormData;
}
