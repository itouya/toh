import { Component, Input, ElementRef } from '@angular/core';
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
  isUnChange: boolean = true;
  imageFile: any;

  constructor(
    private heroService: HeroService,
    private activeModal: NgbActiveModal,
    private el: ElementRef,
    private http: HttpClient
  ) {
    this._el = this.el.nativeElement;
  }

  save(): void {
    this.heroService.update(this.hero)
      .subscribe(() => this.activeModal.close('Close Click'));
  }

  previewImage(fileInput: any): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.imageFile = fileInput.target.files[0];
      const reader = new FileReader();
      reader.onload = ((e) => {
        this._el.querySelector('.card-img-top').setAttribute('src', e.target['result']);
        this.isUnChange = false;
      });
      reader.readAsDataURL(this.imageFile);
    }
  }

  fileUpload(): void {
    console.log('image upload ...');
    let formData = new FormData();
    formData.append('account_image', this.imageFile);
    formData.append('id', this.hero.id.toString());
    formData.append('name', this.hero.name);
    this.http.post('http://localhost:8080/upload', formData)
              .subscribe((response) => {
                console.log(response);
                this.hero.account_image = '/images/' + this.imageFile.name;
                this.heroService.update(this.hero).subscribe();
              });
    this.isUnChange = true;
  }

  isDefault(imagePath: String): boolean {
    if(imagePath === '/images/default.png') {
      return true;
    }
    return false;
  }

  resetImage(hero: Hero): void {
    hero.account_image = '/images/default.png';
    this.heroService.update(hero).subscribe();
  }
}
