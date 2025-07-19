import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Loader } from './shared/loader/loader';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CountryEffects } from './state/country/effects/country.effects';
import { countryReducer } from './state/country/reducers/country.reducer';
import { SortByPipe } from './shared/sort-pipe';
import { HoverShadowDirective } from './shared/hover-shadow.directive';

@NgModule({
  declarations: [
    App,        
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SortByPipe,
    HoverShadowDirective,
   
   StoreModule.forRoot({}, {}),
EffectsModule.forRoot([])
    
  ],
  providers: [   
     provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
