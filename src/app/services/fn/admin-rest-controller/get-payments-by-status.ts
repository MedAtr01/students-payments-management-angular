/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Payment } from '../../models/payment';

export interface GetPaymentsByStatus$Params {
  status: 'CREATED' | 'VALIDATED' | 'REJECTED';
}

export function getPaymentsByStatus(http: HttpClient, rootUrl: string, params: GetPaymentsByStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Payment>>> {
  const rb = new RequestBuilder(rootUrl, getPaymentsByStatus.PATH, 'get');
  if (params) {
    rb.query('status', params.status, {});
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

getPaymentsByStatus.PATH = '/admin/payments/byStatus';
