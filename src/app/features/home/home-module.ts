import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
 import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TagsInput } from '../../shared/tags-input/tags-input';
import { Loader } from '../../shared/loader/loader';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CountryEffects } from '../../state/country/effects/country.effects';
import { countryReducer } from '../../state/country/reducers/country.reducer';
import { SortByPipe } from '../../shared/sort-pipe';
import { AutoFocusDirective } from '../../shared/auto-focus.directive';
import { HoverShadowDirective } from '../../shared/hover-shadow.directive';

@NgModule({
  declarations: [Home, TagsInput, Loader],
  imports: [
    StoreModule.forFeature('country', countryReducer),
    EffectsModule.forFeature([CountryEffects]),
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatOptionModule,
    SortByPipe,
    AutoFocusDirective,
    HoverShadowDirective
],
})
export class HomeModule {}
