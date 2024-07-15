/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdateStudentInfo$Params {
  username: string;
  email: string;
  fullName: string;
  studentCode: string;
  program: string;
}

export function updateStudentInfo(http: HttpClient, rootUrl: string, params: UpdateStudentInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, updateStudentInfo.PATH, 'put');
  if (params) {
    rb.query('username', params.username, {});
    rb.query('email', params.email, {});
    rb.query('fullName', params.fullName, {});
    rb.query('studentCode', params.studentCode, {});
    rb.query('program', params.program, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

updateStudentInfo.PATH = '/web/Update-Info';
