/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {addPayment} from '../fn/student-rest-controller/add-payment';
import {AddPayment$Params} from '../fn/student-rest-controller/add-payment';
import {getPaymentFile} from '../fn/student-rest-controller/get-payment-file';
import {GetPaymentFile$Params} from '../fn/student-rest-controller/get-payment-file';
import {getStudentByUser} from '../fn/student-rest-controller/get-student-by-user';
import {GetStudentByUser$Params} from '../fn/student-rest-controller/get-student-by-user';
import {getStudentPayments} from '../fn/student-rest-controller/get-student-payments';
import {GetStudentPayments$Params} from '../fn/student-rest-controller/get-student-payments';
import {updateStudentInfo} from '../fn/student-rest-controller/update-student-info';
import {UpdateStudentInfo$Params} from '../fn/student-rest-controller/update-student-info';
import {updateStudentInfo1} from '../fn/student-rest-controller/update-student-info-1';
import {UpdateStudentInfo1$Params} from '../fn/student-rest-controller/update-student-info-1';

@Injectable({providedIn: 'root'})
export class StudentRestControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateStudentInfo()` */
  static readonly UpdateStudentInfoPath = '/web/Update-Info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStudentInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStudentInfo$Response(params: UpdateStudentInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
    return updateStudentInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStudentInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStudentInfo(params: UpdateStudentInfo$Params, context?: HttpContext): Observable<{}> {
    return this.updateStudentInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  /** Path part for operation `addPayment()` */
  static readonly AddPaymentPath = '/web/addPayment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPayment()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  addPayment$Response(params: AddPayment$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
    return addPayment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addPayment$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  addPayment(params: AddPayment$Params, context?: HttpContext): Observable<{}> {
    return this.addPayment$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  /** Path part for operation `updateStudentInfo1()` */
  static readonly UpdateStudentInfo1Path = '/web/Update-Info/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStudentInfo1()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateStudentInfo1$Response(params: UpdateStudentInfo1$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
    return updateStudentInfo1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStudentInfo1$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateStudentInfo1(params: UpdateStudentInfo1$Params, context?: HttpContext): Observable<{}> {
    return this.updateStudentInfo1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  /** Path part for operation `getStudentByUser()` */
  static readonly GetStudentByUserPath = '/web/student';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentByUser$Response(params?: GetStudentByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
    return getStudentByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentByUser(params?: GetStudentByUser$Params, context?: HttpContext): Observable<{}> {
    return this.getStudentByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  /** Path part for operation `getStudentPayments()` */
  static readonly GetStudentPaymentsPath = '/web/student-payments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentPayments()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentPayments$Response(params?: GetStudentPayments$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
    return getStudentPayments(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentPayments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentPayments(params?: GetStudentPayments$Params, context?: HttpContext): Observable<{}> {
    return this.getStudentPayments$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  /** Path part for operation `getPaymentFile()` */
  static readonly GetPaymentFilePath = '/web/student-payments/{paymentId}/paymentFile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentFile$Response(params: GetPaymentFile$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getPaymentFile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaymentFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentFile(params: GetPaymentFile$Params, context?: HttpContext): Observable<Blob> {
    return this.getPaymentFile$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
