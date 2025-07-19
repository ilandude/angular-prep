import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { TagsInput } from '../../shared/tags-input/tags-input';
import { Loader } from '../../shared/loader/loader';

@NgModule({
  declarations: [Home, TagsInput, Loader],
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
      MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule ,
    MatCheckboxModule,
    MatOptionModule,
     
  ],
})
export class HomeModule {}
