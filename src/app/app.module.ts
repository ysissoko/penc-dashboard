import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LayoutModule } from './views/layout/layout.module';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    ToastrModule.forRoot(environment.toastrConfig),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideMessaging(() => getMessaging()),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
