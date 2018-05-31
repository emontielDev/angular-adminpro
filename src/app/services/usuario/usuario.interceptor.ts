// // src/app/auth/token.interceptor.ts
// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
// import { UsuarioLocalStorage } from './usuario.storage';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(public auth: UsuarioLocalStorage) {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     request = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${this.auth.getToken()}`
//       }
//     });
//     return next.handle(request);
//   }
// }

import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { UsuarioLocalStorage } from '../service.index';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
constructor(
    public _usuarioLocalStorage: UsuarioLocalStorage
) { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('intercepted request ... ');
    if (this._usuarioLocalStorage.estaAutenticado()) {
        request = request.clone({
            setHeaders: {
            'X-AUTHENTICATION-TOKEN': `${this._usuarioLocalStorage.getToken()}`
            }
        });
    }
    return next.handle(request);
    // console.log('intercepted request ... ');

    // // Clone the request to add the new header.
    // const authReq = req.clone({ headers: req.headers.set('X-HOSPITAL-TOKEN', 'Holi')});

    // console.log('Sending request with new header now ...');

    // // send the newly created request
    // return next.handle(authReq)
    // .catch((error, caught) => {
    // // intercept the respons error and displace it to the console
    // console.log('Error Occurred');
    // console.log(error);
    // // return the error to the method that called it
    // return Observable.throw(error);
    // }) as any;
    }
}
