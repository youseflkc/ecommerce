import { LoadingDialogComponent } from './../loading-dialog/loading-dialog.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogRef } from './../dialog-ref';
import { IDialogConfig } from './../dialog-config';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingDialogService {
  private opened = false;
  private dialogRef!: DialogRef;

  constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * opens a dialog with the specified component using an overlay component
   */
  open<T>(component: ComponentType<T>) {
    if (!this.opened) {
      this.opened = true;
      const positionStrategy = this.overlay
        .position()
        .global()
        .right('0')
        .top('0');

      const overlayRef = this.overlay.create({
        positionStrategy,
        hasBackdrop: false,
        panelClass: 'loading-panel',
      });

      this.dialogRef = new DialogRef(overlayRef);

      const injector = Injector.create({
        parent: this.injector,
        providers: [{ provide: DialogRef, useValue: this.dialogRef }],
      });

      const portal = new ComponentPortal(component, null, injector);
      overlayRef.attach(portal);
    } else {
      this.dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
        this.open(LoadingDialogComponent);
      });
    }
  }

  /**
   * closes the dialog reference
   */
  close() {
    this.dialogRef.close();
    this.opened = false;
  }

  /**
   * returns true if loading dialog is currently opened
   */
  isOpen(): boolean {
    return this.opened;
  }
}
