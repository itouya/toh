import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private heroesUrl = 'http://localhost:8080/api/hero';  // URL to web api

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<any> {
    return this.http.get(this.heroesUrl);
  }

  getHero(id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url);
  }

  delete(id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers});
  }

  create(name: string): Observable<any> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers});
  }

  update(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers});
  }

//  private handleError(error: any): Observable<any> {
//    console.error('An error occurred', error); // for demo purposes only
//    return Observable.reject(error.message || error);
//  }
}

