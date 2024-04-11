import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticlesType} from "../../../types/articles.type";
import {PopupService} from "../../shared/services/popup.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {UserInfoType} from "../../../types/user-info.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  serviceItems = [
    {
      id: 1,
      image: 'assets/images/page/service1.png',
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 'От 7 500₽',
    },
    {
      id: 2,
      image: 'assets/images/page/service2.png',
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 'От 3 500₽',
    },
    {
      id: 3,
      image: 'assets/images/page/service3.png',
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 'От 1 000₽',
    },
    {
      id: 4,
      image: 'assets/images/page/service4.png',
      title: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 'От 750',
    },
  ]

  articles: ArticlesType[] = [];
  popup: boolean = false;
  successPopup: boolean = false;
  firstPopup: boolean = false;
  errorText: boolean = false;
  title: string | null = null

  popupForm = this.fb.group({
    service: [''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  constructor(private articleService: ArticleService,
              private popupService: PopupService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.articleService.getPopularArticles()
      .subscribe((data: ArticlesType[]) => {
        this.articles = data
      })
  }

  popupShow(title: string) {
    this.popup = true;
    this.firstPopup = true;
    if (title) {
      this.title = title;
    } else  {
      this.title = this.serviceItems[0].title
    }
  }

  popupHide() {
    this.popup = false;
    this.firstPopup = false;
    this.successPopup = false;
  }

  popupRequest() {
    if (this.popupForm.valid && this.popupForm.value.phone
      && this.popupForm.value.name && this.popupForm.value.service) {
      this.popupService.mainRequest(this.popupForm.value.name, this.popupForm.value.phone, 'order', this.popupForm.value.service)
        .subscribe({
          next: (data: DefaultResponseType) => {
            this.popupForm.reset();
            this.firstPopup = false;
            this.successPopup = true;
            this._snackBar.open(data.message);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Произошла ошибка при отправке формы, попробуйте еще раз.');
            }
          }
        })
    }
  }


}
