import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {
   MER_API = "http://192.168.1.58:5000/api/v1"
   API_URL = 'http://https://admin.tirgo.io/api'

   constructor(private authService: AuthService, private router: Router) { }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = '';
      if (req.url.startsWith(this.MER_API)) {
        token = localStorage.getItem('merchantJWT');
      } else {
        token = AuthService.jwt;
      }
  
      const authReq = req.clone({   
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      return next.handle(authReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {}
          return event;
        })
      );
    }
}
