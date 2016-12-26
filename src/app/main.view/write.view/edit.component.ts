import {
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { SecondGatewayService, Article } from '../../service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-edit',
  templateUrl : './write.component.html',
  styleUrls: ['./write.component.css']
})
export class EditComponent implements AfterViewInit, OnDestroy{
  editor;
  id:string;
  item: any;
  Checker:Subject<boolean>;
  initialTags: string[] = [];
  loadChecker:Subject<boolean>;
  count:number = 0;
  startedAt:number = 0;
  article:Article = new Article("","","",[]);
  tagString: string = "";
  buttonisOn: boolean = false;

  @ViewChild('previewArticle') previewArticle: ElementRef;
  @ViewChild('tags') tagElement: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: SecondGatewayService,
    private af: AngularFire){
      this.Checker = new Subject<boolean>();
      this.loadChecker = new Subject<boolean>();
      this.loadChecker.subscribe(value=>{
        this.count += 1;
        if(this.count == 2){
          this.editor.setContent(this.item.body);
        }
      })
      // 1. Read article
      this.id = activatedRoute.snapshot.params['id'];
      firebase.database().ref('articles/'+this.id).once('value')
        .then(snapshot=>{
          this.item = snapshot.val();

          // 2. Check auth
          if(authService.UserProfile['uid'] != this.item['uid']){
            this.router.navigate(['home']);
          }

          // 3. Load..
          Object.keys(this.item).forEach(key=>{
            if(key.charAt(0) == '_'){
              this.initialTags.push(key.substring(1));
              this.article.tags.push(key.substring(1));
            }
          });
          this.buttonisOn = true;
          this.startedAt = this.item.startedAt;
          this.tagString = this.article.tags.join();
          this.article.title = this.item.title;
          //this.editor.setContent(this.item.body);
          this.previewArticle.nativeElement.innerHTML = this.item.body;
          this.loadChecker.next(true);
        });
    }

  ngAfterViewInit(){
    tinymce.init({
      selector: '#tinymce',
      plugins: ['link', 'paste', 'table'],
      language_url: '/assets/langs/ko.js',
      skin_url: '/assets/skins/lightgray',
      init_instance_callback: editor=>{
        this.loadChecker.next(true);
      },
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

  tagChange(input: any){
    this.article.tags = input.replace(/\s/g, '').split(',');
  }

  ngOnDestroy(){
    tinymce.remove(this.editor);
  }

  SubmitArticle(){
    this.buttonisOn = false;
    this.article.body = this.editor.getContent();

    // 0. remove some tags
    this.initialTags.forEach(tag=>{
      if(this.article.tags.indexOf(tag) == -1){
        this.af.database.list('articles/'+this.id+'/_'+tag).remove();
      }
    });
    
    // 1. Update article
    let sendData = {
      body: this.article.body,
      title : this.article.title
    };
    this.article.tags.forEach(tag=>{
      sendData['_'+tag] = this.startedAt;
    });

    this.af.database.list('articles/').update(this.id, sendData);

    // 2. Remove tags
    firebase.database().ref('tags').orderByChild(this.id).equalTo(true)
       .once('value').then(snapshot=>{

         if(snapshot.exists()){
           let n_snapshot = 0;
           let stanpshotLength = Object.keys(snapshot.val()).length;
           snapshot.forEach(child=>{
             this.af.database.list('tags/'+child.key+'/'+this.id).remove()
                .then(()=>{
                  n_snapshot += 1;
                  if(n_snapshot == stanpshotLength){
                    this.Checker.next(true);
                  }
                });
             return false;
           });
         }else{
           this.Checker.next(true);
         }

       });

       // 4. Register Observalbe
       this.Checker.subscribe(value=>{
         // Refreshing tags
         this.article.tags.forEach(tag=>{
           this.af.database.object('tags/'+tag+'/'+this.id).set(true);
         });

         this.router.navigate(['/home','detail',this.id]);
       });
  }

}
