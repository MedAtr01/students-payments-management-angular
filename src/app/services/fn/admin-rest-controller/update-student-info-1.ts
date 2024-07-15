/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdateStudentInfo1$Params {
  code: string;
  username: string;
  email: string;
  fullName: string;
  program: string;
}

export function updateStudentInfo1(http: HttpClient, rootUrl: string, params: UpdateStudentInfo1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, updateStudentInfo1.PATH, 'put');
  if (params) {
    rb.path('code', params.code, {});
    rb.query('username', params.username, {});
    rb.query('email', params.email, {});
    rb.query('fullName', params.fullName, {});
    rb.query('program', params.program, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'multipart/form-data', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

updateStudentInfo1.PATH = '/admin/students/{code}/Update-Info';
