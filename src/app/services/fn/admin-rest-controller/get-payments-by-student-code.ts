/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {PaymentDto} from "../../models/payment-dto";

export interface GetPaymentsByStudentCode$Params {
  code: string;
}

export function getPaymentsByStudentCode(http: HttpClient, rootUrl: string, params: GetPaymentsByStudentCode$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PaymentDto>>> {
  const rb = new RequestBuilder(rootUrl, getPaymentsByStudentCode.PATH, 'get');
  if (params) {
    rb.path('code', params.code, {});
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PaymentDto>>;
    })
  );
}

getPaymentsByStudentCode.PATH = '/admin/student/{code}/payments';
