import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecondGatewayService } from '../../service';
import { Subject } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';

export class Article{
  constructor(public title:string, public body:string) {};
}

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
              private af: AngularFire){
    this.article = new Article("","");
    this.finishChecker = new Subject<boolean>();
    this.finishChecker.subscribe(value =>{
      if(value){
        // Finished upload
        this.article.body = '<video src="'+ this.downloadURL
                          +'" width="100%" controls></video>';

        const sendData = {
          uid: this.authService.UserProfile['uid'],
          title: this.article.title,
          body: this.article.body
        };
        this.af.database.list('/articles').push(sendData)
            .then(() => {
              this.router.navigate(['home']);
            })
            .catch((err) => {
              alert("Uploading Fail!");
            });
      }
    });
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
