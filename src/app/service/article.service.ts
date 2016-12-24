import { Injectable } from '@angular/core';
import { SecondGatewayService } from './secondgateway.service';
import { AngularFire } from 'angularfire2';
import { Subject } from 'rxjs/Rx';

export class Article{
  constructor(public title:string, public body:string, public tags: string[]) {};
}

@Injectable()
export class ArticleService{
  tagList:any[] = [];
  userReference: any[] = [];

  constructor(
    private af: AngularFire,
    private authService: SecondGatewayService){
      //get tag list
      firebase.database().ref('tags').on('value', (snapshot) =>{
        this.tagList = [];
        snapshot.forEach(child=>{
          this.tagList.push({key:child.key, numChild: child.numChildren()});
          return false;
        });
      });

      // get user reference
      this.af.database.list('users/')
          .subscribe((snapshot) => {
            snapshot.forEach(
              (snapshot) => {
              this.userReference[snapshot.$key] = {displayName: snapshot.displayName, photoURL: snapshot.photoURL};
            });
          });
    }

  Register(article: Article){
    let uploadChecker = new Subject<boolean>();
    let n_tags = 0;
    let date = new Date();
    const sendData = {
      uid: this.authService.UserProfile['uid'],
      title: article.title,
      body: article.body,
      startedAt: -Date.now(),
      date: date.getFullYear() +'/' + (date.getMonth()+1) + '/' + date.getDate()
    };

    // Add tags
    article.tags.forEach(tag=>{
      sendData['_'+tag] = sendData.startedAt;
    });

    // register Article
    let uploadTask =this.af.database.list('articles').push(sendData);
    uploadTask.then(()=>{
            // When upload task success, update tag lists
            article.tags.forEach(tag=>{
              this.af.database.object('tags/'+tag+'/'+uploadTask.key).set(true)
                .then(()=>{
                  n_tags += 1;
                  if(n_tags == article.tags.length){
                    uploadChecker.next(true);
                  }
                })
                .catch((err)=>{
                  uploadChecker.next(false);
                  alert("Upload Fail!");
                });
            });
        })
        .catch((err)=>{
          uploadChecker.next(false);
          alert("Upload Fail!");
        });

        return uploadChecker;
  }

  Search(keyword: string){
    let uploadChecker = new Subject();
    let articleList:Article[] = [];
    let now = Date.now();
    let articleRef = firebase.database().ref('articles');
    articleRef.orderByChild('_'+keyword).startAt(-now).on('value', snapshot=>{
      snapshot.forEach(child=>{
        articleList.push(child.val());
        return false;
      });
      uploadChecker.next(articleList);
    });

    return uploadChecker;
  }

  LoadArticles(keyword: string, startTime: number, n_items: number){
    let loadChecker = new Subject<any[]>();
    let articleList:Article[] = [];
    let articleRef;
    if(keyword.length == 0){
      articleRef = firebase.database().ref('articles').orderByChild('startedAt');
    }else{
      articleRef = firebase.database().ref('articles').orderByChild('_'+keyword);
    }

    articleRef.startAt(startTime).limitToFirst(n_items).once('value')
    .then(snapshot => {
      snapshot.forEach(child=>{
        articleList.push(child.val());
        return false;
      });
      loadChecker.next(articleList);
    });

    return loadChecker;
  }

}
