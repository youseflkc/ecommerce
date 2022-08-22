import { DialogMessageService } from './../services/dialog-message.service';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private dialogService: DialogMessageService) {}

  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      this.dialogService.open(DialogMessageComponent, {
        header: 'A client error has occured. Please try again later.',
        message: error?.message,
      });
      console.error(error);
    }
  }
}
