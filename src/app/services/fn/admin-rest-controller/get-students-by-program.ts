/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Student } from '../../models/student';

export interface GetStudentsByProgram$Params {
  programId: string;
}

export function getStudentsByProgram(http: HttpClient, rootUrl: string, params: GetStudentsByProgram$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Student>>> {
  const rb = new RequestBuilder(rootUrl, getStudentsByProgram.PATH, 'get');
  if (params) {
    rb.path('programId', params.programId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Student>>;
    })
  );
}

getStudentsByProgram.PATH = '/admin/students/Program/{programId}';
