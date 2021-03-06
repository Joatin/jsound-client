import { Action } from '@ngrx/store';

export abstract class Reducer<T> {

  public abstract initialState: T;
  private handlers = this.handlers || {};

  public reduce(state: T = this.initialState, action: Action): T {
    if (this.handlers[action.constructor.name]) {
      let result = this.handlers[action.constructor.name](action);
      return Object.assign({}, state, result);
    } else {
      return state;
    }
  }
}

export function Type(value: { new(p1?: any): Action; }) {
  return (target: Reducer<any>, propertyKey: string) => {
    target['handlers'] = target['handlers'] || {};
    target['handlers'][value.name] = target[propertyKey];
  };
}

export function getReducer<T extends Reducer<any>>(type: { new(): T; } ) {
  // let red = new type();
  // return red.reduce.bind(red);
}
