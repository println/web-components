import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';

import { AutocompleteComponent } from './autocomplete.component'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryService } from './country.service';
import { TjAutocompleteModule } from '../tj-autocomplete/tj-autocomplete.module';
import { DateValueAccessor, DateValueAccessorModule } from 'angular-date-value-accessor';


@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    HttpClientModule,
    TooltipModule,
    TjAutocompleteModule,
    DateValueAccessorModule

  ],
  exports: [
    AutocompleteComponent
  ],
  providers: [
    HttpClient,
    CountryService
  ],
  bootstrap: []
})
export class AutocompleteModule { }
