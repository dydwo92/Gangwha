import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService, Article, SecondGatewayService } from '../../service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostDetailComponent{
  loadingComplete:boolean = false;
  item:any;
  comments:any[] = [];
  id:string ="";
  article:Article = new Article("","","",[]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    private authService: SecondGatewayService,
    private af: AngularFire){
    this.id = activatedRoute.snapshot.params['id'];
    this.item = af.database.object('articles/'+this.id);
    this.item.subscribe(snapshot => {
      if(!snapshot.$exists()){
        router.navigate['home'];
      }else{
        let temp = snapshot;

        // Comments
        this.comments = [];
        if(snapshot.comments){
          Object.keys(snapshot.comments).forEach(key=>{
            snapshot.comments[key]['key'] = key;
            this.comments.push(snapshot.comments[key]);
          });
        }
        temp['id'] = this.id;
        if(this.comments){
          temp['comment_length'] = Object.keys(this.comments).length;
        }else{
          temp['comment_length'] = 0;
        }
        this.article = temp;
        this.loadingComplete = true;
      }
    });
  }

  removeComment(key: string){
      if(window.confirm("댓글을 삭제하시겠습니까?")){
        this.af.database.list('articles/' + this.article.id +'/comments/'+key).remove();
      }
  }

  removeArticle(){
    if(window.confirm("정말로 글을 삭제하시겠습니까?")){
      this.loadingComplete = false;
      // 1. remove article
      this.af.database.list('articles/' + this.article.id).remove()
         .then(()=>{
           // 2. remove tag
          firebase.database().ref('tags').orderByChild(this.article.id).equalTo(true)
             .once('value').then(snapshot=>{
               snapshot.forEach(child=>{
                 this.af.database.list('tags/'+child.key+'/'+this.article.id).remove();
                 return false;
               });
               this.router.navigate(['home']);
             });
         });
    }
  }

  sendNotification(){
    const authDomain = "gangwha.org";
    Kakao.Link.sendTalkLink({
      label: '[강화봇] ' + this.article['title'] + ' - ' + this.articleService.userReference[this.article['uid']].displayName,
      webButton: {
        text: '링크 바로가기',
        url: authDomain + '/home/detail/' + this.article['id']
      }
    });
  }

  registerNotification(bool: boolean){
    if(bool){
      if(window.confirm("해당 글을 공지하겠습니까? 이전 공지글은 자동으로 취소됩니다.")){
        // 이전 공지글 취소
        firebase.database().ref('notification').set(this.article['id']);
      }
    }else{
      if(window.confirm("공지를 취소하겠습니까?")){
        firebase.database().ref('notification').set("");
      }
    }
  }

  OnSubmit(input:any){
    let sendData = [];
    let date = new Date();
    sendData['comment'] = input.comment;
    sendData['uid'] = this.authService.UserProfile['uid'];
    sendData['date'] = date.getFullYear() +'/' + (date.getMonth()+1) + '/' + date.getDate();
    // Register article
    this.af.database.list('articles/'+this.article['id'] + '/comments').push(sendData);
  }

}
