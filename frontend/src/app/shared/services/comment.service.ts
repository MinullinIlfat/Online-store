import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ArticlesType} from "../../../types/articles.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentsType} from "../../../types/comments.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: CommentsType[] = [];
  constructor(private http: HttpClient) { }

  getComments(id: string | null):Observable<{allCount: number, comments: CommentsType[]}> {
    return this.http.get<{allCount: number, comments: CommentsType[]}>(environment.api + 'comments?offset=3&article=' + id);
  }
  addComment(text: string, id: string):Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text, id
    });
  }
}
