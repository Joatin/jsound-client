import { Reducer, Type } from '../util/reducer';
import { CongregationState } from './congregation.state';
import { LoadCongregationsAction, SelectCongregationAction } from './congregation.actions';

export class CongregationReducer extends Reducer<CongregationState> {
  public initialState: CongregationState = {
    isLoadingAuthorizedCongregations: false,
    authorizedCongregations: [
      {
        name: 'test1',
        uniqueName: 'test1'
      },
      {
        name: 'test2',
        uniqueName: 'test2'
      },
      {
        name: 'test3',
        uniqueName: 'test3'
      }
    ],
    selectedCongregation: null
  };

  @Type(LoadCongregationsAction)
  private handleLoadCongregations(action: LoadCongregationsAction) {
    return {
      isLoadingAuthorizedCongregations: true
    };
  }

  @Type(SelectCongregationAction)
  private handleSelectCongregation(action: SelectCongregationAction) {
    return {
      selectedCongregation: action.congregation
    };
  }
}

let reducer = new CongregationReducer();
export function congregationReducerFunc(state, action) {
  return reducer.reduce(state, action);
}
