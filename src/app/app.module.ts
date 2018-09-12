import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { MatButtonModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';

import { AppComponent } from "./app.component";
import { KoreanComponent } from "../korean/korean.component";
import { AmericanComponent } from "../american/american.component";

import { AmericanService } from "../american/american.service";
import { KoreanService } from "../korean/korean.service";

@NgModule({
  declarations: [AppComponent, KoreanComponent, AmericanComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  providers: [AmericanService, KoreanService],
  bootstrap: [AppComponent]
})
export class AppModule {}
