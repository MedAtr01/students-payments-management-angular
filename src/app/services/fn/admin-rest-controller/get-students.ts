/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentDto } from '../../models/student-dto';

export interface GetStudents$Params {
}

export function getStudents(http: HttpClient, rootUrl: string, params?: GetStudents$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentDto>>> {
  const rb = new RequestBuilder(rootUrl, getStudents.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StudentDto>>;
    })
  );
}

getStudents.PATH = '/admin/students';
