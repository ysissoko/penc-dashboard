import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import {NgxPermissionsModule} from "ngx-permissions";
import { HttpClientModule } from '@angular/common/http';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { AuthService } from './shared/services/auth/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot(),
    HttpClientModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
