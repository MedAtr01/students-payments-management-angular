/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {getAdminNotifications} from '../fn/notification-controller/get-notifications';
import {GetNotifications$Params} from '../fn/notification-controller/get-notifications';
import {markAsRead} from '../fn/notification-controller/mark-as-read';
import {MarkAsRead$Params} from '../fn/notification-controller/mark-as-read';
import {getStudentNotifications} from '../fn/notification-controller/get-student-notifications';
import {GetStudentNotifications$Params} from '../fn/notification-controller/get-student-notifications';
import {Notification} from '../models/notification';

@Injectable({providedIn: 'root'})
export class NotificationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `markAsRead()` */
  static readonly MarkAsReadPath = '/notifications/{id}/markAsRead';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `markAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  markAsRead$Response(params: MarkAsRead$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return markAsRead(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `markAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  markAsRead(params: MarkAsRead$Params, context?: HttpContext): Observable<void> {
    return this.markAsRead$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getNotifications()` */
  static readonly GetNotificationsPath = '/admin/notifications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNotifications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminNotifications$Response(params?: GetNotifications$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Notification>>> {
    return getAdminNotifications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNotifications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminNotifications(params?: GetNotifications$Params, context?: HttpContext): Observable<Array<Notification>> {
    return this.getAdminNotifications$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Notification>>): Array<Notification> => r.body)
    );
  }

  /** Path part for operation `getStudentNotifications()` */
  static readonly GetStudentNotificationsPath = '/student/notifications/{studentCode}'; // Add path

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentNotifications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentNotifications$Response(params: GetStudentNotifications$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Notification>>> {
    return getStudentNotifications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentNotifications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentNotifications(params: GetStudentNotifications$Params, context?: HttpContext): Observable<Array<Notification>> {
    return this.getStudentNotifications$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Notification>>): Array<Notification> => r.body)
    );
  }

}
