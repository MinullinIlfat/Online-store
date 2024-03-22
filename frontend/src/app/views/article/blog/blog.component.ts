import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {CategoryType} from "../../../../types/category.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  categories: CategoryType[] = [];
  open = false;
  activeParams: CategoryType[] = [];

  constructor(private articleService: ArticleService,
              private router: Router) { }

  ngOnInit(): void {
    this.articleService.getArticles()
      .subscribe( data => {
        this.articles = data.items
      })
    this.articleService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })
  }

  toggle() {
    this.open = !this.open;
  }

  updateFilterParams(url: any, checked: boolean) {
    if (this.activeParams && this.activeParams.length > 0) {
      const existingCategoryInParams = this.activeParams.find(item => item.url === url);
      if (existingCategoryInParams && !checked) {
        this.activeParams = this.activeParams.filter(item => item.url !== url);
      } else if (!existingCategoryInParams && checked) {
        this.activeParams.push(url);
      }
    } else if (checked) {
      this.activeParams = [url];
    }

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }
}
