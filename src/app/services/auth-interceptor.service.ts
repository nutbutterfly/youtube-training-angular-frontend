import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppCookieService } from './app-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private appCookieService: AppCookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.appCookieService.getAccessToken();

    if (token) {
      // modify header
      let modified = req.clone(
        {
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        }
      );

      return next.handle(modified);
    }

    return next.handle(req);
  }

}
