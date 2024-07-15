/* tslint:disable */
/* eslint-disable */
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = environment.rootUrl;
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
