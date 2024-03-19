import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private http: HttpClient) {

  }

  request(name: string, phone: string, type: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', {
      name, phone, type
    });
  }

  mainRequest(name: string, phone: string, type: string, service: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', {
      name, phone, type, service
    });
  }
}
