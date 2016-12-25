import { Component, Renderer } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { ArticleService } from '../../service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  articleList: any=[];
  notificationList: any = [];
  lastStamp:number = 0;
  noMoreArticle:boolean = false;
  loadingComplete:boolean = false;

  constructor(private articleService: ArticleService,
              private renderer: Renderer){

    // Get notification
    firebase.database().ref('articles').orderByChild('notification').equalTo(true)
        .once('value').then(snapshot =>{
          if(snapshot.exists()){
            let data = snapshot.val();
            Object.keys(data).forEach(key=>{
              this.notificationList.push(data[key]);
            });
          }
        });

    let firstLoadTask = this.articleService.LoadArticles("", -Date.now(), 5);
    firstLoadTask.subscribe((result) =>{
      this.articleList = result;
      this.lastStamp = this.articleList[this.articleList.length - 1].startedAt;
      firstLoadTask.unsubscribe();
      this.loadingComplete = true;
    });

    // Detecting scroll down
    this.renderer.listenGlobal('window', 'scroll', (event)=>{
      let dist = window.innerHeight + document.body.scrollTop - document.body.scrollHeight;
      if(dist > -10 && this.loadingComplete && !this.noMoreArticle){
          this.loadingComplete = false;
          let secondLoadTask = this.articleService.LoadArticles("", this.lastStamp + 1, 5);
          secondLoadTask.subscribe((result:any[]) => {
            if(result.length == 0){
              this.noMoreArticle = true;
            }else{
              result.forEach((item)=>{
                this.articleList.push(item);
              });
              this.lastStamp = this.articleList[this.articleList.length - 1].startedAt;
            }
            this.loadingComplete = true;
            secondLoadTask.unsubscribe();
          });
        }
      });

  }

}
