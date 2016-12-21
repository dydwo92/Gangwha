import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent{
  articleList: any=[];

  sanitizeHTML(html: string) :SafeHtml{
      return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  constructor(private af: AngularFire, private sanitizer: DomSanitizer){
    this.af.database.list('articles/')
        .subscribe((snapshot) => {
          this.articleList = snapshot;
        });
  }

}
