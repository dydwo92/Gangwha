import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecondGatewayService, ArticleService, Article } from '../../service';
import { Subject } from 'rxjs/Rx';


@Component({
  selector: 'app-videoupload',
  templateUrl: './videoupload.component.html'
})
export class videoUploadComponent {
  progressValue:number = 0;
  buttonisOn:boolean = true;
  article: Article;
  videoFile: File;

  uploadTask: any;
  finishChecker: Subject<boolean>;
  downloadURL: string;

  constructor(private authService: SecondGatewayService,
              private router: Router,
              private articleService: ArticleService){
    this.article = new Article("","",[]);
    this.finishChecker = new Subject<boolean>();
    this.finishChecker.subscribe(value =>{
      if(value){
        // Finished upload
        this.article.body = '<video src="'+ this.downloadURL
                          +'" width="100%" controls></video>';
        let uploadTask = this.articleService.Register(this.article);
        uploadTask.subscribe((value)=>{
          if(value){
            uploadTask.unsubscribe();
            this.router.navigate(['home']);
          }
        });
      }
    });
  }

  tagChange(input: any){
    this.article.tags = input.replace(/\s/g, '').split(',');
  }

  onChange(input: any){
    this.videoFile = input.files[0];
  }

  onSubmit(form: any){
    this.buttonisOn = false;
    this.uploadTask = firebase.storage().ref('video/' + this.videoFile.name).put(this.videoFile);
    this.uploadTask.on('state_changed',
        (snapshot) => {
          this.progressValue = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.downloadURL = this.uploadTask.snapshot.downloadURL;
          this.finishChecker.next(true);
        });
  }

}
