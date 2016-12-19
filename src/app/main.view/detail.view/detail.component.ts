import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  articleList: FirebaseListObservable<any[]>;

  sanitizeHTML(html: string) :SafeHtml{
      return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  constructor(af: AngularFire, private sanitizer: DomSanitizer) {
    this.articleList = af.database.list('/articles');
  }

}
