import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../../services/token/token.service";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ProfileUploadService {

  constructor(private https: HttpClient, private tokenService: TokenService) {
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const token = this.tokenService.getToken();
    const data: FormData = new FormData();
    data.append('profile', file);

    const newRequest = new HttpRequest('POST', `${environment.rootUrl}/web/Update-Info/profile`, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }
}
