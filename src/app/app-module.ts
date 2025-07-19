import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Loader } from './shared/loader/loader';

@NgModule({
  declarations: [
    App,
     
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [   
     provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
