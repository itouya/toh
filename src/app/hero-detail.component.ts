import { Component, Input } from '@angular/core';
import { NgbActiveModal }   from '@ng-bootstrap/ng-bootstrap';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent {
  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
    private activeModal: NgbActiveModal
  ) {}

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.activeModal.close('Close Click'));
  }
}
