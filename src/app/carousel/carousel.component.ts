import {
  info_animation,
  slide_animation,
} from './../animations';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    slide_animation,
    info_animation,
  ],
})
export class CarouselComponent implements OnInit {
  //products to be displayed in carousel
  @Input() products;

  current_slide = 0;

  //time between each slide
  SLIDE_INTERVAL = 150000;

  //progress bar that is displayed at the bottom of the carousel
  progress_bar_value = 100;

  //background color of carousel
  color = '';

  constructor() {}

  ngOnInit(): void {
    this.color = this.randomBackgroundColor();
    setInterval(() => {
      if (this.progress_bar_value > 0) {
        this.progress_bar_value--;
      } else {
        this.progress_bar_value = 100;
        this.nextSlide();
      }
    }, 150);
  }

  /**
   * changes to the previous slide
   */
  previousSlide() {
    let previous = this.current_slide - 1;
    this.current_slide = previous < 0 ? this.products.length - 1 : previous;
    this.color = this.randomBackgroundColor();
  }

  /**
   * changes to the next slide
   */
  nextSlide() {
    let next = this.current_slide + 1;
    this.current_slide = next === this.products.length ? 0 : next;
    this.progress_bar_value = 100;
    this.color = this.randomBackgroundColor();
  }

  /**
   * goes to the specified slide
   * @param slide_number slide number to move forward to
   */
  goToSlide(slide_number: number) {
    this.current_slide = slide_number;
    this.progress_bar_value = 100;
    this.color = this.randomBackgroundColor();
  }

  /**
   *
   * @returns random integer between 0 and 3
   */
  randomBackgroundColor() {
    let num = Math.floor(Math.random() * 4);
    switch (num) {
      case 0:
        return 'var(--color-product-bg-1)';
      case 1:
        return 'var(--color-product-bg-2)';
      case 2:
        return 'var(--color-product-bg-3)';
      case 3:
        return 'var(--color-font-primary)';
      default:
        return 'var(--color-product-bg-2)';
    }
  }
}
