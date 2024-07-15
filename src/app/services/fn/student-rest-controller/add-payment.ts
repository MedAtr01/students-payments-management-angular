/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

export interface AddPayment$Params {
  amount: number;
  paymentDate: string;
  type: 'CASH' | 'CHECK' | 'DEPOSIT' | 'TRANSFER';
  status: 'CREATED' | 'VALIDATED' | 'REJECTED';
  file?: File;
}

export function addPayment(http: HttpClient, rootUrl: string, params: AddPayment$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
  const rb = new RequestBuilder(rootUrl, addPayment.PATH, 'post');

  const formData: FormData = new FormData();
  formData.append('amount', params.amount.toString());
  formData.append('paymentDate', params.paymentDate);
  formData.append('type', params.type);
  formData.append('status', params.status);
  if (params.file) {
    formData.append('file', params.file);
  }

  return http.post<StrictHttpResponse<{}>>(
    rb.build({responseType: 'json', accept: 'application/json', context}).url,
    formData,
    {observe: 'response'}
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{}>;
    })
  );
}

addPayment.PATH = '/web/addPayment';
