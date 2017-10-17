import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero }           from './hero';

@Injectable()
export class HeroSearchService {

  constructor(private http: HttpClient) {}

  search(term: string): Observable<any> {
    return this.http
               .get(`http://localhost:8080/api/hero/?name=${term}`);
  }
}
