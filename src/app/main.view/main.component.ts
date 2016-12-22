import { Component, Renderer } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  mobileMenu: boolean = false;
  mobileMenuDisplay: boolean = false;
  scrollMargin:number = 0;

  constructor(private renderer: Renderer){
    this.renderer.listenGlobal('window', 'scroll', (evnet) =>{
      if(document.body.scrollTop > 80){
            this.scrollMargin = document.body.scrollTop - 80;
      }else{
        this.scrollMargin = 0;
      }

    });
  }

  onResize(event){
    this.mobileMenu = event.target.innerWidth < 770 ? true : false;
  }
}
