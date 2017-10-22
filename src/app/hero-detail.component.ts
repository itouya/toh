import { Component, Input, ElementRef } from '@angular/core';
import { NgbActiveModal }   from '@ng-bootstrap/ng-bootstrap';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  // styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent {
  @Input() hero: Hero;
  private _el: HTMLElement;
  fileChange = false;

  constructor(
    private heroService: HeroService,
    private activeModal: NgbActiveModal,
    private el: ElementRef
  ) {
    this._el = this.el.nativeElement;
  }

  save(): void {
    this.heroService.update(this.hero)
      .subscribe(() => this.activeModal.close('Close Click'));
  }

  previewImage(fileInput: any): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((e) => {
        this._el.querySelector('.card-img-top').setAttribute('src', e.target['result']);
        this.fileChange = true;
      });
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  fileUpload(): void {
    console.log('image upload ...');
  }
}
