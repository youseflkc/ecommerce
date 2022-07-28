import {
  state,
  trigger,
  style,
  transition,
  animate,
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
  transition('open <=> closed', [animate('0.1s')]),
]);

export let open_close_icon = trigger('open_close_icon', [
  state(
    'open',
    style({
      right: '0%',
    })
  ),
  state(
    'closed',
    style({
      right: '-95%',
    })
  ),
  transition('open <=> closed', [animate('0.1s')]),
]);
