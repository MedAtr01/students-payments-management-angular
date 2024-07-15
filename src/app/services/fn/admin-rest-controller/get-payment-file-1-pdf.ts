/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

export interface GetPaymentFile_1$Pdf$Params {
  paymentId: number;
}

export function getPaymentFile_1$Pdf(http: HttpClient, rootUrl: string, params: GetPaymentFile_1$Pdf$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
  const rb = new RequestBuilder(rootUrl, getPaymentFile_1$Pdf.PATH, 'get');
  if (params) {
    rb.path('paymentId', params.paymentId, {});
  }

  return http.request(
    rb.build({responseType: 'blob', accept: 'application/pdf', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Blob>;
    })
  );
}

getPaymentFile_1$Pdf.PATH = '/admin/paymentFile/{paymentId}';
