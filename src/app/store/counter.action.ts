import { createAction, props } from '@ngrx/store';

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const toCart = createAction('toCart', props<{ value: any }>());
export const auth = createAction('auth', props<{ role: string }>());
