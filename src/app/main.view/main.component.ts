import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  mobileMenu: boolean = false;
  mobileMenuDisplay: boolean = false;

  onResize(event){
    this.mobileMenu = event.target.innerWidth < 770 ? true : false;
  }
}
