import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, throwError, timer, from } from 'rxjs';
import { concatMap, retryWhen, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private _auth: AngularFireAuth) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._auth.authState.pipe(
      switchMap((user) => from(user ? user.getIdToken() : Promise.resolve(null))),
      switchMap((token: string | null) => {
        return next.handle((req.url.includes(environment.BASE_URL) && token) ? req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        }) : req);
      }),
      retryWhen((errors) => errors.pipe(
        tap((error) => console.error("Error: ", error.status)),
        concatMap((error, index) => {
          if (index < maxRetries && error.status === 500) {
            console.log('Retry sending request')
            return timer(delayMs);
          } else if (error.status === 401) {
            this._router.navigate(['/access-denied']);
            return timer(delayMs);
          } else {
            return throwError(() => error);
          }
        })
      )),
      take(2),
    )
  }
}