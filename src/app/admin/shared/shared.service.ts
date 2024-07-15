import {Injectable, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminRestControllerService} from '../../services/services/admin-rest-controller.service'; // Adjust the path as needed
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AddPaymentToStudent$FormData$Params
} from "../../services/fn/admin-rest-controller/add-payment-to-student-form-data";

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit {
  public payments: any[] = [];
  public dataSource!: MatTableDataSource<any>;

  paymentGroup!: FormGroup;
  paymentParams: AddPaymentToStudent$FormData$Params = {
    code: "",
    amount: 0,
    paymentDate: '',
    type: "DEPOSIT",
    status: "CREATED",
    file: undefined
  };

  constructor(private fb: FormBuilder, private adminService: AdminRestControllerService, private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {

  }

  updateStatus(id: number, status: any, component: any) {
    component.loading = true;
    this.adminService.updateStatus({id, status}).subscribe({
      next: () => {
        this.snackBar.open('Status updated successfully', 'Close', {duration: 3000});
        this.updatePaymentStatusInView(id, status);
        component.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open('Failed to update status', 'Close', {duration: 3000});
        component.loading = false;
      }
    });
  }


  updatePaymentStatusInView(id: number, status: any) {
    const payment = this.payments.find((p: any) => p.paymentId === id);
    if (payment) {
      payment.paymentStatus = status;
    }
    this.dataSource = new MatTableDataSource(this.payments); // Refresh data source
  }
}
