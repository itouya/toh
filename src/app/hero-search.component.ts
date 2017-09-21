import { HeroDetailComponent } from './hero-detail.component';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable }        from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  //styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent {
  model: any;
  searching = false;
  searchFailed = false;
  hero: Hero;

  constructor(
    private heroSearchService: HeroSearchService,
    private modalService: NgbModal) {}

  formatMatches = (value: any) => value.name || '';
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
    .switchMap(term =>
      this.heroSearchService.search(term)
      .do(() => this.searchFailed = false)
      .catch(() => {
        this.hero = null;
        this.searchFailed = true;
        return Observable.of([]);
      }))
    .do(() => this.searching = false);

  selected(hero: Hero): void {
    const modalRef = this.modalService.open(HeroDetailComponent);
    modalRef.componentInstance.hero = hero;
  }
}
