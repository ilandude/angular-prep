// country.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountriesService } from '../../../services/countries';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as CountryActions from '../actions/country.actions';



@Injectable()
export class CountryEffects { 

  constructor(private actions$: Actions, private countryService: CountriesService) {
    console.log('actions$ in CountryEffects:', this.actions$);
  }

   loadCountries$ = createEffect(() => 
     this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      switchMap(() =>
        this.countryService.getCountries().pipe(
          map(names => CountryActions.loadCountriesSuccess({ countries : names.map(name => ({name})) })),
          catchError(error => of(CountryActions.loadCountriesFailure({ error })))
        )
      )
    )
  );

  searchCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.searchCountries),
      switchMap(({ term }) =>
        this.countryService.searchCountries(term).pipe(
          map(names => CountryActions.loadCountriesSuccess({ countries : names.map(name => ({name})) })),
          catchError(error => of(CountryActions.loadCountriesFailure({ error })))
        )
      )
    )
  );
}