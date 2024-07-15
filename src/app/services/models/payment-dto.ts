/* tslint:disable */
/* eslint-disable */
import {SimpleStudentDto} from './simple-student-dto';

export interface PaymentDto {
  amount?: number;
  paymentDate?: string;
  paymentFile?: string;
  paymentId?: number;
  paymentStatus?: 'CREATED' | 'VALIDATED' | 'REJECTED';
  paymentType?: 'CASH' | 'CHECK' | 'DEPOSIT' | 'TRANSFER';
  simpleStudentDTO?: SimpleStudentDto;
}
