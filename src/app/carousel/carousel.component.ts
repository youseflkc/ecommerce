import {
  state,
  style,
  transition,
  trigger,
  animate,
  group,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('slide_animation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(1.5) translate(-15%,-10%)',
        }),
        group([
          animate('1s 0.9s', style({ opacity: 1 })),
          animate(
            '14.3s 0s cubic-bezier(.13,.92,.25,.77)',
            style({
              transform: 'scale(1) translate(0,0)',
            })
          ),
        ]),
      ]),
      transition(':leave', [
        animate('0.2s 0.3s', style({opacity: 0,}))
      ])
    ]),
    trigger('btn_animation', [
      state(
        'empty_bar',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('* => empty_bar', [style({ width: '100%' }), animate('15s')]),
    ]),
    trigger('info_animation', [
      transition(':enter', [
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        }),
        animate('1.5s 0.8s cubic-bezier(.13,.92,.25,.77)'),
      ]),
      transition(':leave', [
        animate(
          '0.6s cubic-bezier(.13,.92,.25,.77)',
          style({
            transform: 'translateY(100%)',
            opacity: '0',
          })
        ),
      ]),
    ]),
    trigger('info_scroll_animation', [
      transition(':enter', [
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        }),
        animate('1.5s 2s cubic-bezier(.13,.92,.25,.77)'),
      ]),
    ]),
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
