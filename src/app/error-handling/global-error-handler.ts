import { DialogMessageService } from './../services/dialog-message.service';
import { DialogMessageComponent } from './../dialog-message/dialog-message.component';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private dialogService: DialogMessageService) {}

  handleError(error: any): void {
    const dialogRef = this.dialogService.open(DialogMessageComponent, {
      header: 'A server error has occured. Please try again later.',
      message: 'not found',
      status: 404,
    });
  }
}
