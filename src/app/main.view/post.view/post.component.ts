import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit{
  @Input() article:any;
  @Input() userReference:any;
  @ViewChild('articleBody') articleBody: ElementRef;

  constructor(){}

  ngOnInit(){
    this.articleBody.nativeElement.innerHTML = this.article.body;
    // Tag parse
    let keys = Object.keys(this.article);
    let tags = [];
    keys.forEach(key=>{
      if(key.indexOf("_") == 0){
        tags.push(key.substring(1));
      }
    });
    this.article.tags = tags;
  }

}
