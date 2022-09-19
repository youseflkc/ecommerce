import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-bar',
  templateUrl: './announcement-bar.component.html',
  styleUrls: ['./announcement-bar.component.css'],
})
export class AnnouncementBarComponent implements OnInit {
  //text to be displayed in announcment bar
  @Input() text: string = '';

  constructor() {}

  ngOnInit(): void {}
}
