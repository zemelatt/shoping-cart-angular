import { Action, createReducer, on } from '@ngrx/store';

import { decrement, increment, reset, toCart, auth } from './counter.action';
import { initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state): any => {
    return { ...state, counter: state.counter + 1 };
  }),
  on(decrement, (state): any => {
    return { ...state, counter: state.counter - 1 };
  }),
  on(reset, (state): any => {
    return { ...state, counter: state.counter };
  }),
  on(toCart, (state, action): any => {
    return {
      ...state,
      counter: action.value,
    };
  }),
  on(auth, (state, action): any => {
    return {
      ...state,
      auth: action.role,
    };
  })
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
