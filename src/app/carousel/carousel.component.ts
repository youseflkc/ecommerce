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

  constructor() {}

  ngOnInit(): void {
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
  }

  nextSlide() {
    let next = this.current_slide + 1;
    this.current_slide = next === this.slides.length ? 0 : next;
    this.progress_bar_value = 100;
  }

  goToSlide(slide_number: number) {
    this.current_slide = slide_number;
    this.progress_bar_value = 100;
  }
}
