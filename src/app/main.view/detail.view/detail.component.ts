import { Component, NgZone } from '@angular/core';
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

  constructor(private zone:NgZone, private sanitizer: DomSanitizer) {
    firebase.database().ref('articles/').once('value')
        .then(snapshot => {
          this.zone.run(() => {
            for(var key in snapshot.val()){
              this.articleList.push(snapshot.val()[key]);
            }
          });
        });
  }

}
