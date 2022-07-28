import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit {
  slides = [
    {
      src: 'assets/images/smartphone1.png',
      header: 'On Sale Now!',
      price: '1399',
      info: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt velit quam consequatur atque sapiente placeat officia id, laboriosam autem odio culpa aspernatur est maxime debitis et! Dolor iure molestias similique?',
    },
    {
      src: 'assets/images/headphones1.png',
      header: 'On Sale Now!',
      price: '249',
      info: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt velit quam consequatur atque sapiente placeat officia id, laboriosam autem odio culpa aspernatur est maxime debitis et! Dolor iure molestias similique?',
    },
    {
      src: 'assets/images/smartphone1.png',
      header: 'New!',
      price: '399',
      info: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt velit quam consequatur atque sapiente placeat officia id, laboriosam autem odio culpa aspernatur est maxime debitis et! Dolor iure molestias similique?',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
