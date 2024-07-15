/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Payment } from '../../models/payment';

export interface GetPaymentById$Params {
  id: number;
}

export function getPaymentById(http: HttpClient, rootUrl: string, params: GetPaymentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Payment>> {
  const rb = new RequestBuilder(rootUrl, getPaymentById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Payment>;
    })
  );
}

getPaymentById.PATH = '/admin/payments/{id}';
