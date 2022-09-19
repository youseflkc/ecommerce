import { dialog_animation } from './../animations';
import { DialogRef } from './../dialog-ref';
import { DIALOG_CONFIG } from './../dialog-config';
import { Component, Inject, OnInit } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css'],
  animations: [dialog_animation],
})
/**
 * This dialog box is used to display error messages that are not handled
 */
export class DialogMessageComponent implements OnInit {
  faX = faX;
  dialog = document.querySelector('dialog-box') as HTMLElement;
  constructor(
    @Inject(DIALOG_CONFIG)
    public data: { header: string; message: string; status: number },
    private dialogRef: DialogRef
  ) {}

  ngOnInit(): void {}


  /**
   * closes the dialog box
   */
  close() {
    setTimeout(() => this.dialogRef.close(), 10);
  }
}
