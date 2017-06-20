import * as ngrx from '@ngrx/store';

export function Action(type: string) {
  return class clazz implements ngrx.Action {
    public static TYPE = type;
    public type = type;
  };
}
