import { HeroDetailComponent } from './hero-detail.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal }          from '@ng-bootstrap/ng-bootstrap';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  hero: Hero;

  constructor(private heroService: HeroService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  open(hero: Hero): void {
    const modalRef = this.modalService.open(HeroDetailComponent);
    modalRef.componentInstance.hero = hero;
  }
}
