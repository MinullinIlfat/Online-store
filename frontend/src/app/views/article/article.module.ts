import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { BlogComponent } from './blog/blog.component';
import { DetailComponent } from './detail/detail.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    BlogComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class ArticleModule { }
