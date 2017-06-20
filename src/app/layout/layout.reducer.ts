import { LayoutState } from './layout.state';
import { Reducer } from '../util/reducer';

export class LayoutReducer extends Reducer<LayoutState> {
  public initialState: LayoutState = {
    isServerConnected: true
  };

}

let reducer = new LayoutReducer();
export function layoutReducerFunc(state, action) {
  return reducer.reduce(state, action);
}
