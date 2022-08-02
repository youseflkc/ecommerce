import {
  state,
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AbsoluteSourceSpan } from '@angular/compiler';

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
      position: 'absolute',
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
