import 'rxjs/add/operator/toPromise';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from './country';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(): Promise<Country[]> {
    return this.http.get<any>('assets/data/countries.json')
      .toPromise()
      .then<Country[]>(res => res.data)
      .then<Country[]>(data =>
        data.map((d, i) => {
          let c = new Country(i + 1, d.name, d.code);
          return c;
        })
      );
  }
}
