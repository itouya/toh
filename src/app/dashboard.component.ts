import { HeroDetailComponent } from './hero-detail.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions }          from '@ng-bootstrap/ng-bootstrap';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  hero: Hero;

  constructor(private heroService: HeroService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe((data) => {
        this.heroes = data.slice(1, 5);
      });
  }

  open(hero: Hero): void {
    let options: NgbModalOptions = {
      size: 'lg'
    };
    const modalRef = this.modalService.open(HeroDetailComponent, options);
    modalRef.componentInstance.hero = hero;
  }
}
