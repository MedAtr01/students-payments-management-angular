/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Payment } from '../../models/payment';

export interface UpdateStatus$Params {
  id: number;
  status: 'CREATED' | 'VALIDATED' | 'REJECTED';
}

export function updateStatus(http: HttpClient, rootUrl: string, params: UpdateStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<Payment>> {
  const rb = new RequestBuilder(rootUrl, updateStatus.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.query('status', params.status, {});
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

updateStatus.PATH = '/admin/payment/{id}/update-status';
