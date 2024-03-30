import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {ArticlesType} from "../../../../types/articles.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentService} from "../../../shared/services/comment.service";
import {CommentsType} from "../../../../types/comments.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  serverStaticPath = environment.serverStaticPath;
  article!: ArticleType;
  relatedArticles: ArticlesType[] = [];
  isLogged: boolean = false;
  comments: CommentsType[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private authService: AuthService,
              private commentService: CommentService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.article = data;
          if (this.article.id) {
            this.commentService.getComments(this.article.id)
              .subscribe((data: CommentsType[]) => {
                console.log(data)
              })
          }
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
