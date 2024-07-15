/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetPaymentFile_1$Jpeg$Params {
  paymentId: number;
}

export function getPaymentFile_1$Jpeg(http: HttpClient, rootUrl: string, params: GetPaymentFile_1$Jpeg$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
  const rb = new RequestBuilder(rootUrl, getPaymentFile_1$Jpeg.PATH, 'get');
  if (params) {
    rb.path('paymentId', params.paymentId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'image/jpeg', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<string>>;
    })
  );
}

getPaymentFile_1$Jpeg.PATH = '/admin/paymentFile/{paymentId}';
