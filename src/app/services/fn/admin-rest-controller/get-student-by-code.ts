/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Student } from '../../models/student';

export interface GetStudentByCode$Params {
  code: string;
}

export function getStudentByCode(http: HttpClient, rootUrl: string, params: GetStudentByCode$Params, context?: HttpContext): Observable<StrictHttpResponse<Student>> {
  const rb = new RequestBuilder(rootUrl, getStudentByCode.PATH, 'get');
  if (params) {
    rb.path('code', params.code, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Student>;
    })
  );
}

getStudentByCode.PATH = '/admin/students/{code}';
