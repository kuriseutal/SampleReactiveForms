import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { MatFileUploadModule } from "angular-material-fileupload";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

//containers
import { AppComponent } from "./app.component";
//components
import { KoreanComponent } from "../components/korean/korean.component";
import { AmericanComponent } from "../components/american/american.component";
import { GameComponent } from "../components/game/game.component";
//services
import { AmericanService } from "../components/american/american.service";
import { KoreanService } from "../components/korean/korean.service";

@NgModule({
  declarations: [
    AppComponent, 
    KoreanComponent, 
    AmericanComponent, 
    GameComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [AmericanService, KoreanService],
  bootstrap: [AppComponent]
})
export class AppModule {}
