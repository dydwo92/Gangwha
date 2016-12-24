import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecondGatewayService, ArticleService, Article } from '../../service';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html'
})
export class imageUploadComponent {
  article: Article = new Article("","","",[]);
  buttonisOn: boolean = true;
  showArticle: boolean = false;
  isLoading: boolean = false;
  file_lists: FileList;
  file_srcs: string[] = [];
  downloadURLs: string[] =[];
  progressValue: number[] = [];
  uploadTask: any[] = [];

  finishChecker: Subject<boolean>;
  finishedItem: number = 0;

  constructor(
    private authService: SecondGatewayService,
    private router: Router,
    private articleservice: ArticleService){
      this.finishChecker = new Subject<boolean>();
      this.finishChecker.subscribe(value => {
        if(value){
          // Finished upload
          this.downloadURLs.forEach((url) => {
            const appendStr = '<a href="'+url+'" target="_blank"><img src="'+url+'" width="100%" style="margin-bottom : 5px"></a>';
            this.article.body += appendStr;
          });
          let uploadTask = this.articleservice.Register(this.article);
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

  sum(array: number[]) {
  var result = 0.0;
  for (var i = 0; i < array.length; i++)
    result += array[i];

  return result;
  }

  onSubmit(form: any){
      this.buttonisOn = false;
      // Upload to firebase storage
      for(let i=0; i< this.file_lists.length; i++){
        this.uploadTask[i] = firebase.storage().ref('imags/' + this.file_lists[i].name).put(this.file_lists[i]);
        this.uploadTask[i].on('state_changed',
              (snapshot) => {
                  var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                  this.progressValue[i] = percentage/this.file_lists.length;
              },
              (err) => {
                  console.log(err);
              },
              () => {
                  // upload Success
                  this.downloadURLs[i] = this.uploadTask[i].snapshot.downloadURL;
                  this.finishedItem += 1;
                  if(this.finishedItem == this.file_lists.length){
                    this.finishChecker.next(true);
                  }
              });
      }
  }

  onChange(event: any){
    this.file_lists = event.files;
    this.showArticle = false;
    this.isLoading = true;
    this.file_srcs = [];
    this.readFiles(event.files);
  }

  readFile(file, reader: FileReader, callback){
    reader.onload = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  readFiles(files: FileList, index=0){
    let reader = new FileReader();
    if(index in files){
      this.readFile(files[index], reader, (result)=>{
        this.file_srcs.push(result);
        this.readFiles(files, index+1);
      });
    }else{
      //this.changeDetectorRef.detectChanges();
      this.showArticle = true;
      this.isLoading = false;
    }

  }
}
