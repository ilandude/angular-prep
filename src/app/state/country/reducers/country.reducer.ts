import { createReducer, on } from '@ngrx/store';
import * as CountryActions from '../actions/country.actions';
import { Country } from '../models/country.model';

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: any;
}

export const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

const _countryReducer = createReducer(
  initialState,
  on(CountryActions.loadCountries, state => ({ ...state, loading: true })),
on(CountryActions.searchCountries, state => ({ ...state, loading: true })),
  on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    loading: false,
    countries,
  })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function countryReducer(state: any, action: any) {
    return _countryReducer(state, action);
}