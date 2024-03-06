import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from "rxjs/operators";

@Injectable()

export class ApiInterceptor implements HttpInterceptor {
   MER_API = "https://merchant.tirgo.io/"
   API_URL = 'https://admin.tirgo.io/api'

   constructor() { }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = '';
      if (req.url.startsWith(this.MER_API)) {
        token = localStorage.getItem('merchantJWT');
      } else {
        token = AuthService.jwt;
      }
      let authReq: any;
      if(req.url == 'https://merchant.tirgo.io/api/v1/file/upload' || req.url=='https://admin.tirgo.io/api/users/uploadImage') {
        authReq = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }else {
        authReq = req.clone({   
          setHeaders: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`,
          },
        });
      } 
       
      return next.handle(authReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {}
          return event;
        })
      );
    }
}
