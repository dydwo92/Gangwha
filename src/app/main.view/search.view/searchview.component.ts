import { Component, Renderer } from '@angular/core';
import { ArticleService } from '../../service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchview',
  templateUrl: './searchview.component.html'
})
export class SearchViewComponent{
  articleList:any = [];
  lastStamp:number = 0;
  noMoreArticle:boolean = false;
  keyword: string = "";
  loadingComplete:boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private renderer: Renderer){
    this.keyword = activatedRoute.snapshot.params['keyword'];

    let firstLoadTask = this.articleService.LoadArticles(this.keyword, -Date.now(), 5);
    firstLoadTask.subscribe((result)=>{
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
          let secondLoadTask = this.articleService.LoadArticles(this.keyword, this.lastStamp + 1, 5)
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
