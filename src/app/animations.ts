import {
  state,
  trigger,
  style,
  transition,
  animate,
  group,
  query,
  stagger,
} from '@angular/animations';

export let open_close_input = trigger('open_close_input', [
  state(
    'open',
    style({
      transform: 'translateX(0)',
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      transform: 'translateX(150%)',
      opacity: 0,
    })
  ),
  transition('open <=> closed', [animate('0.2s')]),
]);

export let open_close_icon = trigger('open_close_icon', [
  state(
    'open',
    style({
      position: 'unset',
      left: '5px',
    })
  ),
  state(
    'closed',
    style({
      position: 'absolute',
      right: '5px',
    })
  ),
  transition('open <=> closed', [animate('0.2s')]),
]);

export let slide_animation = trigger('slide_animation', [
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
  transition(':leave', [animate('0.2s 0.3s', style({ opacity: 0 }))]),
]);

export let btn_animation = trigger('btn_animation', [
  state(
    'empty_bar',
    style({
      transform: 'translateX(-100%)',
    })
  ),
  transition('* => empty_bar', [style({ width: '100%' }), animate('15s')]),
]);

export let info_animation = trigger('info_animation', [
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
]);

export let info_scroll_animation = trigger('info_scroll_animation', [
  transition(':enter', [
    style({
      transform: 'translateY(100%)',
      opacity: 0,
    }),
    animate('1.5s 2s cubic-bezier(.13,.92,.25,.77)'),
  ]),
]);

export let testimonial_animation = trigger('testimonial_animation', [
  transition(':enter', [
    query('h4', [style({ opacity: 0, transform: 'translateX(100vw)' })]),
    query('h5', [style({ opacity: 0, transform: 'translateX(100vw)' })]),
    query('.btn', [style({ opacity: 0, transform: 'translateX(100vw)' })], {
      optional: true,
    }),
    query(
      '.testimonial__body__links',
      [style({ opacity: 0, transform: 'translateX(100vw)' })],
      {
        optional: true,
      }
    ),
    group([
      query('h4', animate('0.5s 0.4s cubic-bezier(.15,.61,.08,.94)')),
      query('h5', animate('0.5s 0.5s cubic-bezier(.15,.61,.08,.94)')),
      query('.btn', animate('0.5s 0.6s cubic-bezier(.15,.61,.08,.94)'), {
        optional: true,
      }),
      query(
        '.testimonial__body__links',
        animate('0.5s 0.6s cubic-bezier(.15,.61,.08,.94)'),
        {
          optional: true,
        }
      ),
    ]),
  ]),

  transition(':leave', [
    group([
      query('h4', [
        animate(
          '0.5s cubic-bezier(.75,.05,1,.42)',
          style({ opacity: 0, transform: 'translateX(-100vw)' })
        ),
      ]),
      query('h5', [
        animate('0.5s 0.1s cubic-bezier(.75,.05,1,.42)'),
        style({ opacity: 0, transform: 'translateX(-100vw)' }),
      ]),
      query(
        '.btn',
        [
          animate('0.5s 0.2s cubic-bezier(.75,.05,1,.42)'),
          style({ opacity: 0, transform: 'translateX(-100vw)' }),
        ],
        { optional: true }
      ),
      query(
        '.testimonial__body__links',
        [
          animate('0.5s 0.2s cubic-bezier(.75,.05,1,.42)'),
          style({ opacity: 0, transform: 'translateX(-100vw)' }),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

export let dialog_animation = trigger('dialog_animation', [
  transition(':enter', [
    style({
      transform: 'translateX(100%)',
    }),
    animate(
      '0.4s 1s cubic-bezier(0,.69,.25,1.02)',
      style({ transform: 'translateX(0)' })
    ),
  ]),
]);
