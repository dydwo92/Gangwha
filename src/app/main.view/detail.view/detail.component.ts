import { Component, Renderer } from '@angular/core';
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
  lastStamp:number = 0;
  loadingChecker: Subject<boolean>;
  loadingComplete:boolean = false;

  sanitizeHTML(html: string) :SafeHtml{
      return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  constructor(private af: AngularFire,
              private sanitizer: DomSanitizer,
              private renderer: Renderer){

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

    this.articleRef = firebase.database().ref('articles');
    this.articleRef.orderByChild("startedAt").limitToFirst(5)
    .on('value',(snapshot) =>{
      snapshot.forEach((child)=>{
        this.articleList.push(child.val());
      });
      this.lastStamp = this.articleList[this.articleList.length-1].startedAt + 1;
      this.loadingChecker.next(true);
    });

    // Detecting scroll down
    this.renderer.listenGlobal('window', 'scroll', (event)=>{
      let dist = window.innerHeight + document.body.scrollTop - document.body.scrollHeight;
      if(dist > -1 && this.loadingComplete){
          this.loadingChecker.next(false);
          this.loadArticle();
      }
    });

  }

  loadArticle(){
    this.loadingChecker.next(false);
    this.articleRef.orderByChild("startedAt").startAt(this.lastStamp).limitToFirst(5)
    .on('value', (snapshot)=>{
      snapshot.forEach((child)=>{
        this.articleList.push(child.val());
      });
      this.lastStamp = this.articleList[this.articleList.length-1].startedAt + 1;
      this.loadingChecker.next(true);
    })
  }

}
