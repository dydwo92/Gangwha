import {
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { SecondGatewayService, ArticleService, Article } from '../../service';

@Component({
  selector: 'app-wrtie',
  templateUrl : './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnDestroy, AfterViewInit{
  editor;
  article: Article = new Article("","","",[]);
  buttonisOn: boolean = true;

  @ViewChild('previewArticle') previewArticle: ElementRef;

  constructor(
    private router: Router,
    private authService: SecondGatewayService,
    private articleService: ArticleService){}

  ngAfterViewInit(){
    tinymce.init({
      selector: '#tinymce',
      plugins: ['link', 'paste', 'table'],
      language_url: '/assets/langs/ko.js',
      skin_url: '/assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.previewArticle.nativeElement.innerHTML = editor.getContent();
        });
        editor.on('Change', () => {
          this.previewArticle.nativeElement.innerHTML = editor.getContent();
        });
      },
    });
  }

  ngOnDestroy(){
    tinymce.remove(this.editor);
  }

  tagChange(input: any){
    this.article.tags = input.replace(/\s/g, '').split(',');
  }

  SubmitArticle(){
    this.buttonisOn = false;
    this.article.body = this.editor.getContent();
    let uploadTask = this.articleService.Register(this.article);
    uploadTask.subscribe((value)=>{
          if(value){
            uploadTask.unsubscribe();
            this.router.navigate(['home']);
          }
        });
  }
}
