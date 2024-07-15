/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Payment } from '../../models/payment';

export interface GetPaymentsByType$Params {
  type: 'CASH' | 'CHECK' | 'DEPOSIT' | 'TRANSFER';
}

export function getPaymentsByType(http: HttpClient, rootUrl: string, params: GetPaymentsByType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Payment>>> {
  const rb = new RequestBuilder(rootUrl, getPaymentsByType.PATH, 'get');
  if (params) {
    rb.query('type', params.type, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Payment>>;
    })
  );
}

getPaymentsByType.PATH = '/admin/payments/byType';
