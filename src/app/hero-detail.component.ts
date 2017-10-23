import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal }   from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

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
  @ViewChild('accountCard') cardEl: ElementRef;
  isUnchanged = true;
  uploadfile: any;

  constructor(
    private heroService: HeroService,
    private activeModal: NgbActiveModal,
    private http: HttpClient
  ) {}

  save(): void {
    this.heroService.update(this.hero)
      .subscribe(() => this.activeModal.close('Close Click'));
  }

  preview(fileInput: any): void {
    this._el = this.cardEl.nativeElement;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ((e) => {
        this._el.querySelector('.card-img-top').setAttribute('src', e.target['result']);
        this.isUnchanged = false;
      });
      reader.readAsDataURL(fileInput.target.files[0]);
      this.uploadfile = fileInput.target.files[0];
    }
  }

  upload(): void {
    console.log('upload...');
    let formData = new FormData();
    formData.append('account_image', this.uploadfile);
    formData.append('name', this.hero.name);
    formData.append('id', this.hero.id.toString());
    this.http
      .post('http://localhost:8080/upload', formData)
      .subscribe(response => {
        console.log(response);
      });
    this.isUnchanged = true;
  }
}
