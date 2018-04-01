import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';

import { TjAutocompleteComponent } from './tj-autocomplete.component'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterpolationComponent, InterpolationService } from './interpolation.service';
import { InputTemplateDirective } from './input-template.directive';
import { DateValueAccessor } from 'angular-date-value-accessor';


@NgModule({
  declarations: [
    TjAutocompleteComponent,
    InterpolationComponent,
    InputTemplateDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    HttpClientModule,
    TooltipModule
  ],
  exports: [
    TjAutocompleteComponent,
    InputTemplateDirective
  ],
  entryComponents: [
    InterpolationComponent
  ],
  providers: [],
  bootstrap: []
})
export class TjAutocompleteModule { }
