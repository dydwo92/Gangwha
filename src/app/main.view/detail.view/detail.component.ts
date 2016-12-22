import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AngularFire } from 'angularfire2';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent{
  articleList: any=[];
  userReference: any = [];
  articleRef: any;
  userRef: any;
  loadingChecker: Subject<boolean>;
  loadingComplete:boolean = false;

  sanitizeHTML(html: string) :SafeHtml{
      return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  constructor(private af: AngularFire, private sanitizer: DomSanitizer){
    this.loadingChecker = new Subject<boolean>();
    this.loadingChecker.subscribe(value=>{
      this.loadingComplete = value;
    });

    this.af.database.list('users/')
        .subscribe((snapshot) => {
          snapshot.forEach(
            (snapshot) => {
            this.userReference[snapshot.$key] = {displayName: snapshot.displayName, photoURL: snapshot.photoURL};
          });
        });

    this.articleRef = this.af.database.list('articles/', {
        query: {
          
        }
      }).subscribe(
          (snapshot) => {
          this.articleList = snapshot;
          this.loadingChecker.next(true);
          this.articleRef.unsubscribe();
        },
          (err) => {
            console.log(err);
        });

  }

  loadArticle(){

  }

}
