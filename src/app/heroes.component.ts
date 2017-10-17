import { Component, OnInit } from '@angular/core';
import { NgbModal }          from '@ng-bootstrap/ng-bootstrap';
import { Router }            from '@angular/router';

import { Hero }                from './hero';
import { HeroService }         from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  // styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  page: number = 1;
  collectionSize: number = 0;
  pageSize: number = 5;

  constructor(
    private heroService: HeroService,
    private modalService: NgbModal,
    private router: Router) {
    }

  open(hero: Hero): void {
    const modalRef = this.modalService.open(HeroDetailComponent);
    modalRef.componentInstance.hero = hero;
  }

  getHeroes(): void {
    this.heroService
        .getHeroes().subscribe(heroes => {
          this.heroes = heroes;
          this.collectionSize = this.heroes.length;
        });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .map(hero => {
        this.heroes.push(hero);
        this.collectionSize = this.heroes.length;
      });
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .map(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          this.collectionSize = this.heroes.length;
        });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  range(): Hero[] {
    let start = (this.page - 1) * this.pageSize;
    let end = start + this.pageSize;
    return this.heroes.slice(start, end);
  }
}
