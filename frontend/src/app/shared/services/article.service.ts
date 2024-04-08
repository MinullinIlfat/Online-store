import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticlesType} from "../../../types/articles.type";
import {environment} from "../../../environments/environment";
import {CategoryType} from "../../../types/category.type";
import {ArticleType} from "../../../types/article.type";
import {ActivateParamsType} from "../../../types/activate-params.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {

  }

  getPopularArticles():Observable<ArticlesType[]> {
    return this.http.get<ArticlesType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActivateParamsType):Observable<{count: number, pages: number, items: ArticlesType[]}> {
    return this.http.get<{count: number, pages: number, items: ArticlesType[]}>(environment.api + 'articles', {
      params: params
    });
  }
  getArticle(url: string):Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/' + url);
  }
  getRelatedArticle(url: string):Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }
  getCategories():Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(environment.api + 'categories');
  }
}
