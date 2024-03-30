import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ArticlesType} from "../../../types/articles.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentsType} from "../../../types/comments.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: CommentsType[] = [];
  constructor(private http: HttpClient) { }

  getComments(id: string | null):Observable<CommentsType[]> {
    return this.http.get<CommentsType[]>(environment.api + 'comments?offset=3&article=' + id);
  }
}
