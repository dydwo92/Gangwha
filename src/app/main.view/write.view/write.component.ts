import {
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { SecondGatewayService } from '../../service';

export class Article{
  constructor(public title:string, public body:string) {};
}

@Component({
  selector: 'app-wrtie',
  templateUrl : './write.component.html'
})
export class WriteComponent implements OnDestroy, AfterViewInit{
  editor;
  article: Article = new Article("Title","");
  buttonisOn: boolean = true;

  @ViewChild('previewArticle') previewArticle: ElementRef;

  constructor(private router: Router, private af: AngularFire, private authService: SecondGatewayService){}

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
      uid: this.authService.UserProfile['uid'],
      title : this.article.title,
      body : this.article.body
    };
    this.af.database.list('/articles').push(sendData)
        .then(()=>{
          this.router.navigate(['home']);
        })
        .catch(
        (err) => {
          alert("Uploading Fail!");
        });
  }
}
