import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DeletePaymentService {

  private apiUrl = environment.rootUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  deletePayment(paymentId: number): Observable<void> {
    return new Observable<void>(observer => {
      this.http.delete<void>(`${this.apiUrl}/web/deletePayment/${paymentId}`).subscribe({
        next: () => {
          this.snackBar.open('Payment deleted successfully', 'Close', {duration: 3000});
          observer.next();
          observer.complete();
        },
        error: err => {
          this.snackBar.open('Deletion Failed ', 'Close', {duration: 3000});
          observer.error(err);
        }
      });
    });
  }
}
