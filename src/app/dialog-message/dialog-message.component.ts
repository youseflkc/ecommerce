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
export class DialogMessageComponent implements OnInit {
  faX = faX;
  dialog = document.querySelector('dialog-box') as HTMLElement;
  startAnimation = false;
  constructor(
    @Inject(DIALOG_CONFIG)
    public data: { header: string; message: string; status: number },
    private dialogRef: DialogRef
  ) {}

  ngOnInit(): void {}

  // openAlertDialog(error: { header: string; message: string; status: number }) {
  //   // this.error = error;
  //   this.dialog.classList.add('dialog-box--show dialog-box--alert');
  // }

  // closeAlertDialog() {
  //   this.dialog.classList.remove('dialog-box--show dialog-box--alert');
  // }

  close() {
    setTimeout(() => this.dialogRef.close(), 10);
  }
}
