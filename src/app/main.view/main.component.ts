import { Component, Renderer } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
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
}
