import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  articleList: any=[];

  sanitizeHTML(html: string) :SafeHtml{
      return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  constructor( private sanitizer: DomSanitizer) {

  }

}
