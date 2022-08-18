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
import { catchError, Observable, retry, finalize, throwError } from 'rxjs';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialogService: DialogMessageService,
    private loadingService: LoadingDialogService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.open(LoadingDialogComponent);
    return next.handle(request).pipe(
      retry(1),
      finalize(() => this.loadingService.close()),
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    if (navigator.onLine) {
      this.dialogService.open(DialogMessageComponent, {
        header: 'A server error has occured. Please try again later.',
        message: error.statusText || error.message || error.toString(),
        status: error.status,
      });
    } else {
      this.dialogService.open(DialogMessageComponent, {
        header: 'A server error has occured. Please try again later.',
        message: 'No internet connection',
        status: error.status,
      });
    }
  }
}
