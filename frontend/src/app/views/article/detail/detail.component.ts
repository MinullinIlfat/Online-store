import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {ArticlesType} from "../../../../types/articles.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  serverStaticPath = environment.serverStaticPath;
  article!: ArticleType;
  relatedArticles: ArticlesType[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.article = data;
        })
    })
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getRelatedArticle(params['url'])
        .subscribe((data: ArticlesType[]) => {
          this.relatedArticles = data;
        })
    })
  }

}
