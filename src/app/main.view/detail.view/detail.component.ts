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
  loadingStart:boolean = false;
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
              let pushData = data[key];
              if(pushData.comments){
                pushData['comment_length'] = Object.keys(pushData.comments).length;
              }else{
                pushData['comment_length'] = 0;
              }
              pushData['id'] = key;
              this.notificationList.push(data[key]);
            });
          }
        });

    // Detecting scroll down
    this.renderer.listenGlobal('window', 'scroll', (event)=>{
      let dist = window.innerHeight + document.body.scrollTop - document.body.scrollHeight;
      if(dist > -10 && this.loadingComplete && !this.noMoreArticle && this.loadingStart){
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

  startLoading(){
    if(window.confirm("용량이 큰 자료(10MB 이상)들이 많습니다. 모바일의 경우 WiFi연결을 확인하세요.")){
      this.loadingStart = true;
      // Article Load start
      let firstLoadTask = this.articleService.LoadArticles("", -Date.now(), 5);
      firstLoadTask.subscribe((result) =>{
        this.articleList = result;
        this.lastStamp = this.articleList[this.articleList.length - 1].startedAt;
        firstLoadTask.unsubscribe();
        this.loadingComplete = true;
      });
    }
  }

}
