import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

/**
 * src: https://johnbwoodruff.com/posts/angular-cdk-dialog/
 * references the dialog-box and allows us to subscribe to it to close it
 */
export class DialogRef {
  private afterClosedSubject = new Subject<any>();

  constructor(private overlayRef: OverlayRef) {}

  /**
   * Closes the overlay. You can optionally provide a result.
   */
  public close(result?: any) {
    //animates element out of view before disposing it
    this.overlayRef.overlayElement.style.transform = 'translateX(100%)';

    //waits 400ms for animation to finish before disposing
    setTimeout(() => this.overlayRef.dispose(), 400);
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  /**
   * An Observable that notifies when the overlay has closed
   */
  public afterClosed(): Observable<any> {
    return this.afterClosedSubject.asObservable();
  }
}
