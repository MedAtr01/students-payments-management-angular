/* tslint:disable */
/* eslint-disable */
import {Student} from './student';

export interface Payment {
  amount?: number;
  paymentDate?: string;
  paymentFile?: string;
  paymentId?: number;
  paymentStatus?: 'CREATED' | 'VALIDATED' | 'REJECTED';
  paymentType?: 'CASH' | 'CHECK' | 'DEPOSIT' | 'TRANSFER';
  student?: Student;
}
