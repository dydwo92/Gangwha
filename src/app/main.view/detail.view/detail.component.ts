import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent{
  articleList: any=[];
  userReference: any = [];
  sanitizeHTML(html: string) :SafeHtml{
      return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  constructor(private af: AngularFire, private sanitizer: DomSanitizer){
    this.af.database.list('users/')
        .subscribe((snapshot) => {
          snapshot.forEach(
            (snapshot) => {
            this.userReference[snapshot.$key] = {displayName: snapshot.displayName, photoURL: snapshot.photoURL};
          });
        });

    this.af.database.list('articles/')
        .subscribe(
          (snapshot) => {
          this.articleList = snapshot;
        },
          (err) => {
            console.log(err);
          });
  }

}
