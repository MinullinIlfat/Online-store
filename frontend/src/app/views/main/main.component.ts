import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {PopupService} from "../../shared/services/popup.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

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
  popupForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    service: ['', [Validators.required]],
  });

  articles: ArticleType[] = [];
  popup: boolean = false;
  successPopup: boolean = false;
  firstPopup: boolean = false;
  errorText:boolean = false;

  constructor(private articleService: ArticleService,
              private popupService: PopupService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.articleService.getPopularArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data
      })
  }

  popupShow() {
    this.popup = true;
    this.firstPopup = true;
  }

  popupHide() {
    this.popup = false;
    this.firstPopup = false;
    this.successPopup = false;
  }

  popupRequest1() {
    if (this.popupForm.valid && this.popupForm.value.phone
      && this.popupForm.value.name && this.popupForm.value.service) {
      this.popupService.mainRequest(this.popupForm.value.name, this.popupForm.value.phone, 'order', this.popupForm.value.service)
        .subscribe( {
          next: (data: DefaultResponseType) => {
            this.firstPopup = false;
            this.successPopup = true;
            this._snackBar.open(data.message);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка запроса');
            }
          }
        })
    }
  }

}
