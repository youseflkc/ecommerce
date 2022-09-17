import {
  btn_animation,
  info_animation,
  slide_animation,
  info_scroll_animation,
} from './../animations';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    slide_animation,
    btn_animation,
    info_animation,
    info_scroll_animation,
  ],
})
export class CarouselComponent implements OnInit {
  @Input() slides;

  current_slide = 0;
  SLIDE_INTERVAL = 150000;
  progress_bar_value = 100;

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

  previousSlide() {
    let previous = this.current_slide - 1;
    this.current_slide = previous < 0 ? this.slides.length - 1 : previous;
    this.color = this.randomBackgroundColor();
  }

  nextSlide() {
    let next = this.current_slide + 1;
    this.current_slide = next === this.slides.length ? 0 : next;
    this.progress_bar_value = 100;
    this.color = this.randomBackgroundColor();
  }

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
