import { Component, OnInit } from '@angular/core';
import {PopupService} from "../../services/popup.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  popupForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });
  popup: boolean = false;
  successPopup: boolean = false;
  firstPopup: boolean = false;
  constructor(private popupService: PopupService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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

  popupRequest() {
    if (this.popupForm.valid && this.popupForm.value.phone
      && this.popupForm.value.name) {
      this.popupService.request(this.popupForm.value.name, this.popupForm.value.phone, 'consultation')
        .subscribe( {
          next: (data: DefaultResponseType) => {
            this.popupForm.reset()
            this.firstPopup = false;
            this.successPopup = true;
            this._snackBar.open(data.message);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('произошла ошибка при отправке формы, попробуйте еще раз.');
            }
          }
        })
    }
  }
}
