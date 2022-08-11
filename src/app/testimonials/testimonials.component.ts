import { testimonial_animation } from './../animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  animations: [testimonial_animation],
})
export class TestimonialsComponent implements OnInit {
  //section of the testimonial that changes
  selected_body: string = 'shipping';

  constructor() {}

  ngOnInit(): void {}

  setSelected_body(selected_body: string) {
    this.selected_body = selected_body;
  }
}
