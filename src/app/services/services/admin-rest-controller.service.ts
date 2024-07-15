/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {getPaymentById} from '../fn/admin-rest-controller/get-payment-by-id';
import {GetPaymentById$Params} from '../fn/admin-rest-controller/get-payment-by-id';
import {getPaymentFile_1$Jpeg} from '../fn/admin-rest-controller/get-payment-file-1-jpeg';
import {GetPaymentFile_1$Jpeg$Params} from '../fn/admin-rest-controller/get-payment-file-1-jpeg';
import {getPaymentFile_1$Pdf} from '../fn/admin-rest-controller/get-payment-file-1-pdf';
import {GetPaymentFile_1$Pdf$Params} from '../fn/admin-rest-controller/get-payment-file-1-pdf';
import {getPayments} from '../fn/admin-rest-controller/get-payments';
import {GetPayments$Params} from '../fn/admin-rest-controller/get-payments';
import {getPaymentsByStatus} from '../fn/admin-rest-controller/get-payments-by-status';
import {GetPaymentsByStatus$Params} from '../fn/admin-rest-controller/get-payments-by-status';
import {getPaymentsByStudentCode} from '../fn/admin-rest-controller/get-payments-by-student-code';
import {GetPaymentsByStudentCode$Params} from '../fn/admin-rest-controller/get-payments-by-student-code';
import {getPaymentsByType} from '../fn/admin-rest-controller/get-payments-by-type';
import {GetPaymentsByType$Params} from '../fn/admin-rest-controller/get-payments-by-type';
import {getStudentByCode} from '../fn/admin-rest-controller/get-student-by-code';
import {GetStudentByCode$Params} from '../fn/admin-rest-controller/get-student-by-code';
import {getStudents} from '../fn/admin-rest-controller/get-students';
import {GetStudents$Params} from '../fn/admin-rest-controller/get-students';
import {getStudentsByProgram} from '../fn/admin-rest-controller/get-students-by-program';
import {GetStudentsByProgram$Params} from '../fn/admin-rest-controller/get-students-by-program';
import {Payment} from '../models/payment';
import {Student} from '../models/student';
import {StudentDto} from '../models/student-dto';
import {updateStatus} from '../fn/admin-rest-controller/update-status';
import {UpdateStatus$Params} from '../fn/admin-rest-controller/update-status';
import {PaymentDto} from "../models/payment-dto";
import {
  addPaymentToStudent$FormData,
  AddPaymentToStudent$FormData$Params
} from "../fn/admin-rest-controller/add-payment-to-student-form-data";
import {updateStudentInfo1, UpdateStudentInfo1$Params} from "../fn/admin-rest-controller/update-student-info-1";

@Injectable({providedIn: 'root'})
export class AdminRestControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateStatus()` */
  static readonly UpdateStatusPath = '/admin/payment/{id}/update-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStatus$Response(params: UpdateStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Payment>> {
    return updateStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStatus(params: UpdateStatus$Params, context?: HttpContext): Observable<Payment> {
    return this.updateStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<Payment>): Payment => r.body)
    );
  }

  /** Path part for operation `getStudents()` */
  static readonly GetStudentsPath = '/admin/students';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudents$Response(params?: GetStudents$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentDto>>> {
    return getStudents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudents(params?: GetStudents$Params, context?: HttpContext): Observable<Array<StudentDto>> {
    return this.getStudents$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<StudentDto>>): Array<StudentDto> => r.body)
    );
  }

  /** Path part for operation `getStudentByCode()` */
  static readonly GetStudentByCodePath = '/admin/students/{code}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentByCode()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentByCode$Response(params: GetStudentByCode$Params, context?: HttpContext): Observable<StrictHttpResponse<Student>> {
    return getStudentByCode(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentByCode$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentByCode(params: GetStudentByCode$Params, context?: HttpContext): Observable<StudentDto> {
    return this.getStudentByCode$Response(params, context).pipe(
      map((r: StrictHttpResponse<StudentDto>): StudentDto => r.body)
    );
  }

  /** Path part for operation `getStudentsByProgram()` */
  static readonly GetStudentsByProgramPath = '/admin/students/Program/{programId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentsByProgram()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentsByProgram$Response(params: GetStudentsByProgram$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Student>>> {
    return getStudentsByProgram(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentsByProgram$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentsByProgram(params: GetStudentsByProgram$Params, context?: HttpContext): Observable<Array<Student>> {
    return this.getStudentsByProgram$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Student>>): Array<Student> => r.body)
    );
  }

  /** Path part for operation `getPaymentsByStudentCode()` */
  static readonly GetPaymentsByStudentCodePath = '/admin/student/{code}/payments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentsByStudentCode()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentsByStudentCode$Response(params: GetPaymentsByStudentCode$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Payment>>> {
    return getPaymentsByStudentCode(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaymentsByStudentCode$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentsByStudentCode(params: GetPaymentsByStudentCode$Params, context?: HttpContext): Observable<Array<PaymentDto>> {
    return this.getPaymentsByStudentCode$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PaymentDto>>): Array<PaymentDto> => r.body)
    );
  }

  /** Path part for operation `getPayments()` */
  static readonly GetPaymentsPath = '/admin/payments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPayments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPayments$Response(params?: GetPayments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PaymentDto>>> {
    return getPayments(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPayments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPayments(params?: GetPayments$Params, context?: HttpContext): Observable<Array<PaymentDto>> {
    return this.getPayments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PaymentDto>>): Array<PaymentDto> => r.body)
    );
  }

  /** Path part for operation `getPaymentById()` */
  static readonly GetPaymentByIdPath = '/admin/payments/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentById$Response(params: GetPaymentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Payment>> {
    return getPaymentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaymentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentById(params: GetPaymentById$Params, context?: HttpContext): Observable<Payment> {
    return this.getPaymentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Payment>): Payment => r.body)
    );
  }

  /** Path part for operation `getPaymentsByType()` */
  static readonly GetPaymentsByTypePath = '/admin/payments/byType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentsByType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentsByType$Response(params: GetPaymentsByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Payment>>> {
    return getPaymentsByType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaymentsByType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentsByType(params: GetPaymentsByType$Params, context?: HttpContext): Observable<Array<Payment>> {
    return this.getPaymentsByType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Payment>>): Array<Payment> => r.body)
    );
  }

  /** Path part for operation `getPaymentsByStatus()` */
  static readonly GetPaymentsByStatusPath = '/admin/payments/byStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentsByStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentsByStatus$Response(params: GetPaymentsByStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Payment>>> {
    return getPaymentsByStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaymentsByStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentsByStatus(params: GetPaymentsByStatus$Params, context?: HttpContext): Observable<Array<Payment>> {
    return this.getPaymentsByStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Payment>>): Array<Payment> => r.body)
    );
  }

  /** Path part for operation `getPaymentFile_1()` */
  static readonly GetPaymentFile_1Path = '/admin/paymentFile/{paymentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentFile_1$Jpeg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentFile_1$Jpeg$Response(params: GetPaymentFile_1$Jpeg$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getPaymentFile_1$Jpeg(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaymentFile_1$Jpeg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentFile_1$Jpeg(params: GetPaymentFile_1$Jpeg$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getPaymentFile_1$Jpeg$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentFile_1$Pdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentFile_1$Pdf$Response(params: GetPaymentFile_1$Pdf$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getPaymentFile_1$Pdf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaymentFile_1$Pdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentFile_1$Pdf(params: GetPaymentFile_1$Pdf$Params, context?: HttpContext): Observable<Blob> {
    return this.getPaymentFile_1$Pdf$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPaymentToStudent$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  addPaymentToStudent$FormData$Response(params: AddPaymentToStudent$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
    return addPaymentToStudent$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addPaymentToStudent$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  addPaymentToStudent$FormData(params: AddPaymentToStudent$FormData$Params, context?: HttpContext): Observable<{}> {
    return this.addPaymentToStudent$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStudentInfo1()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStudentInfo1$Response(params: UpdateStudentInfo1$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
    return updateStudentInfo1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStudentInfo1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStudentInfo1(params: UpdateStudentInfo1$Params, context?: HttpContext): Observable<{}> {
    return this.updateStudentInfo1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  updateStudentPassword(username: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.rootUrl}/admin/students/${username}/update-password`, {body: password});
  }
}
