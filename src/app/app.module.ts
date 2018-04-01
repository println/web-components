import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    AutocompleteModule,
    DateValueAccessorModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
