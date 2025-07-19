// country.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from '../reducers/country.reducer';

export const selectCountryState = createFeatureSelector<CountryState>('country');

export const selectCountries = createSelector(
  selectCountryState,
  state => state.countries
);

export const selectLoading = createSelector(
  selectCountryState,
  state => state.loading
);