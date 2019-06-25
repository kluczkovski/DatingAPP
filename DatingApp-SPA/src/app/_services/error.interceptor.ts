import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {

          if (error.status === 401) {
            return throwError(error.statusText);
          }

          // From Header Erros, it was customized in Web API Core
          const applicationError = error.error;
          if (applicationError &&  typeof applicationError !== 'object') {
              return throwError(applicationError);
          }

          // Normal erros from the backend
          const auxError = error.error;
          const serverErros = auxError.errors;
          let modalStateErros = '';
          if (serverErros && typeof serverErros === 'object') {
            for (const key in serverErros) {
              if (serverErros[key]) {
                  modalStateErros += serverErros[key] + '\n';
              }
            }
          }
          return throwError(modalStateErros || serverErros || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
