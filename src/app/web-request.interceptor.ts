import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebReqInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    request = this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse): any => {
        console.log(error);
        if (error.status === 401) {
          //401 error so we are unathorized
          //refresh the access token
          this.authService.logout();
        }
        return throwError(() => new Error('test'));
      })
    );
  }

  addAuthHeader(request: HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken();

    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token,
        },
      });
    }
    return request;
  }
}
