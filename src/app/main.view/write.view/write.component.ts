import {
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';

export class Article{
  constructor(public name:string, public title:string, public body:string) {};
}

@Component({
  selector: 'app-wrtie',
  templateUrl : './write.component.html'
})
export class WriteComponent implements OnDestroy, AfterViewInit{
  buttonisOn:  boolean = true;
  editor;
  article: Article;

  @ViewChild('previewArticle') previewArticle: ElementRef;

  constructor(private router: Router){
      this.article = new Article("yongjae","","");
  }

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

  SubmitArticle(){
    this.buttonisOn = false;
    this.article.body = this.editor.getContent();
    const sendData = {
      title : this.article.title,
      name : this.article.name,
      body : this.article.body
    };

    firebase.database().ref('articles').push(sendData).then(
      ()=> {
        this.router.navigate(['home']);
      }).catch(
      (err) => {
        this.buttonisOn = true;
        alert("Uploading Fail!");
      });
  }
}
