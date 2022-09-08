import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoadingDialogComponent } from './../loading-dialog/loading-dialog.component';
import { LoadingDialogService } from './../services/loading-dialog.service';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { DialogMessageService } from './../services/dialog-message.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  retry,
  finalize,
  throwError,
  retryWhen,
  mergeMap,
  of,
  delay,
} from 'rxjs';

const maxAttempts = 2; //maximum number of times to retry request when there is a server error
const delayMs = 3000; //number of ms to wait between retrying request attempts.

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialog_service: DialogMessageService,
    private loading_service: LoadingDialogService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //displays loading dialog only when products are loading or items are added to cart
    if (
      request.url.includes('products') ||
      (request.url.includes('/items') &&
        request.url.includes('/carts') &&
        request.method === 'POST')
    ) {
      this.loading_service.open(LoadingDialogComponent);
    }
    return next.handle(request).pipe(
      retryWhen((error) => {
        return error.pipe(
          mergeMap((error: HttpErrorResponse, index) => {
            if (
              index < maxAttempts &&
              error.status.toString().startsWith('5')
            ) {
              return of(error).pipe(delay(delayMs));
            }
            throw error;
          })
        );
      }),
      finalize(() => {
        if (this.loading_service.isOpen()) {
          this.loading_service.close();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    if (navigator.onLine) {
      this.dialog_service.open(DialogMessageComponent, {
        header: 'A server error has occured. Please try again later.',
        message: error.statusText || error.message || error.toString(),
        status: error.status,
      });
    } else {
      this.dialog_service.open(DialogMessageComponent, {
        header: 'A server error has occured. Please try again later.',
        message: 'No internet connection',
        status: error.status,
      });
    }
  }
}
