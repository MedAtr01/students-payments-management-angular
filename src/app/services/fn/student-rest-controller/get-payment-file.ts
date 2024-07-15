import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

export interface GetPaymentFile$Params {
  paymentId: number;
}

export function getPaymentFile(http: HttpClient, rootUrl: string, params: GetPaymentFile$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
  const rb = new RequestBuilder(rootUrl, getPaymentFile.PATH, 'get');
  if (params) {
    rb.path('paymentId', params.paymentId, {});
  }

  return http.request(
    rb.build({responseType: 'blob', accept: 'application/pdf', context})
  ).pipe(
    filter((r: any): r is HttpResponse<Blob> => r instanceof HttpResponse),
    map((r: HttpResponse<Blob>) => {
      return r.clone({body: r.body as Blob}) as StrictHttpResponse<Blob>;
    })
  );
}

getPaymentFile.PATH = '/web/student-payments/{paymentId}/paymentFile';
