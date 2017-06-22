import { Congregation } from './congregation';

export interface CongregationState {
  isLoadingAuthorizedCongregations: boolean;
  authorizedCongregations: Congregation[];
  selectedCongregation: Congregation;
}
