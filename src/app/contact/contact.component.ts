import { Component, OnInit } from '@angular/core';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import {
  faEnvelope,
  faMailReply,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  faPhone = faPhone;
  faEmail = faEnvelope;
  faAddress = faAddressCard;

  constructor() {}

  ngOnInit(): void {}

  sendMessage() {
    let name_el = document.getElementById('name') as HTMLInputElement;
    let email_el = document.getElementById('email') as HTMLInputElement;
    let phone_el = document.getElementById('phone') as HTMLInputElement;
    let message_el = document.getElementById('message') as HTMLInputElement;

    name_el.value = '';
    email_el.value = '';
    phone_el.value = '';
    message_el.value = '';

    //send message
  }
}
