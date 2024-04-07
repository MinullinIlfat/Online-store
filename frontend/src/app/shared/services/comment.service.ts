import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommentsType} from "../../../types/comments.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {AuthService} from "../../core/auth/auth.service";
import {ActionListType} from "../../../types/action-list.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: CommentsType[] = [];
  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getAllCount(id: string | null): Observable<{allCount: number}> {
    return this.http.get<{allCount: number}>(environment.api + `comments?&article=` + id)
  }

  getComments(id: string | null, allCount: number): Observable<{comments: CommentsType[] }> {
    return this.http.get<{comments: CommentsType[] }>(environment.api + 'comments?offset=' + allCount +'&article=' + id);
  }

  addComment(text: string, id: string): Observable<DefaultResponseType> {
    let token: string = this.authService.getTokens().accessToken as string;
    let headers: HttpHeaders = new HttpHeaders();
    if (token) {
      headers = headers.set('x-auth', token);
    }
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {text: text, article: id}, {
      headers: headers
    });
  }
  addAction(id: string, action: string): Observable<DefaultResponseType> {
    let token: string = this.authService.getTokens().accessToken as string;
    let headers: HttpHeaders = new HttpHeaders();
    if (token) {
      headers = headers.set('x-auth', token);
    }
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', {action: action}, {
      headers: headers
    });
  }
  getActions(id: string): Observable<ActionListType[] | DefaultResponseType> {
    let token: string = this.authService.getTokens().accessToken as string;
    let headers: HttpHeaders = new HttpHeaders();
    if (token) {
      headers = headers.set('x-auth', token);
    }
    return this.http.get<ActionListType[] | DefaultResponseType>(environment.api + 'comments/article-comment-actions?articleId=' + id,{headers: headers});
  }
}
