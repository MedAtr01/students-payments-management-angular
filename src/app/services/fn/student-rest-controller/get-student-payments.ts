/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';


export interface GetStudentPayments$Params {
}

export function getStudentPayments(http: HttpClient, rootUrl: string, params?: GetStudentPayments$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
  const rb = new RequestBuilder(rootUrl, getStudentPayments.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({responseType: 'json', accept: 'multipart/form-data', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{}>;
    })
  );
}

getStudentPayments.PATH = '/web/student-payments';
