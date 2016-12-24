import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from '../../service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html'
})
export class PostDetailComponent{
  loadingComplete:boolean = false;
  item:any;
  id:string ="";
  article:Article = new Article("","","",[]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    private af: AngularFire){
    this.id = activatedRoute.snapshot.params['id'];
    this.item = af.database.object('articles/'+this.id);
    this.item.subscribe(snapshot => {
      if(!snapshot.$exists()){
        router.navigate['home'];
      }else{
        let temp = snapshot;
        temp['id'] = this.id;
        this.article = temp;
        this.loadingComplete = true;
      }
    });
  }
}
