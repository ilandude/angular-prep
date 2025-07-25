// country.actions.ts
import { createAction, props } from '@ngrx/store';
import { Country } from '../models/country.model';

export const loadCountries = createAction('[Country] Load Countries');
export const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: Country[] }>()
);
export const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: any }>()
);

export const searchCountries = createAction(
  '[Country] Search Countries',
  props<{ term: string }>()
);