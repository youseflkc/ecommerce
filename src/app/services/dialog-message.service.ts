import { DIALOG_CONFIG, IDialogConfig } from './../dialog-config';
import { DialogRef } from './../dialog-ref';
import { Injectable, Injector } from '@angular/core';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

/**
 * src: https://johnbwoodruff.com/posts/angular-cdk-dialog/
 * class to render custom dialog-box globally
 */
@Injectable({
  providedIn: 'root',
})
export class DialogMessageService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>(component: ComponentType<T>, config: IDialogConfig): DialogRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .right('0')
      .top('0');

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
      panelClass: 'error-panel',

    });

    const dialogRef = new DialogRef(overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_CONFIG, useValue: config },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
