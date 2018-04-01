import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from './country.service';
import { Country } from './country';
import { Event } from './event';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {

    console = console;

    country: Country;
    event: Event;

    countries: Country[];

    filteredCountriesSingle: any[];
    
    constructor(private countryService: CountryService) { 
        this.event = new Event('1.5.8', 'arbitrary-fallbacks', new Date('2016-07-22T00:00:00.000Z'));
    }

    filterCountrySingle(event) {
        let obj:any = {name: "a", age:5};
        
        



        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesSingle = this.filterCountry(query, countries);
        });
    }    

    filterCountry(query, countries: Country[]):Country[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : Country[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }

    setCountry(){
        this.country = {id: 31, name: "Brasil", code: "BR"} as Country;
    }

}
