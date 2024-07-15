/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {Payment} from '../../models/payment';
import {PaymentDto} from "../../models/payment-dto";

export interface GetPayments$Params {
}

export function getPayments(http: HttpClient, rootUrl: string, params?: GetPayments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PaymentDto>>> {
  const rb = new RequestBuilder(rootUrl, getPayments.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Payment>>;
    })
  );
}

getPayments.PATH = '/admin/payments';
