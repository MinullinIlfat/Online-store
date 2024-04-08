import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesType} from "../../../../types/articles.type";
import {CategoryType} from "../../../../types/category.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivateParamsType} from "../../../../types/activate-params.type";
import {AppliedFilterType} from "../../../../types/applied-filter.type";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticlesType[] = [];
  categories: CategoryType[] = [];
  open = false;
  activeParams: ActivateParamsType = {categories: []};
  pages: number[] = [];
  appliedFilters: AppliedFilterType[] = [];

  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const activeParams: ActivateParamsType = {categories: []}
      if (params.hasOwnProperty('categories')) {
        activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
      }
      if (params.hasOwnProperty('page')) {
        activeParams.page = +params['page'];
      }
      this.activeParams = activeParams;
      this.appliedFilters = [];
      this.activeParams.categories.forEach(url => {
        let foundCategory = this.activeParams.categories.find(item => item === url);
        // this.categories.forEach(item => {
        //   if (item.url === foundCategory) {
        //     foundCategory = item.name;
        //   }
        // })
        if (foundCategory === 'smm') {
          foundCategory = 'SMM'
        }
        if (foundCategory === 'frilans') {
          foundCategory = 'Фриланс'
        }
        if (foundCategory === 'target') {
          foundCategory = 'Таргет'
        }
        if (foundCategory === 'kopiraiting') {
          foundCategory = 'Копирайтинг'
        }
        if (foundCategory === 'dizain') {
          foundCategory = 'Дизайн'
        }
        if (foundCategory) {
          this.appliedFilters.push({
            name: foundCategory,
            urlParam: url
          })
        }
      })
      this.articleService.getArticles(this.activeParams)
        .subscribe(data => {
          this.pages = [];
          for (let i = 1; i <= data.pages; i++) {
            this.pages.push(i)
          }
          this.articles = data.items
        })
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
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryInParams = this.activeParams.categories.find(item => item === url);
      if (existingCategoryInParams && !checked) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
      } else if (!existingCategoryInParams && checked) {
        this.activeParams.categories = [...this.activeParams.categories, url]
      }
    } else if (checked) {
      this.activeParams.categories = [url];
    }
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  removeAppliedFilter(appliedFilters: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilters.urlParam);
    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }
  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }
  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }
}
