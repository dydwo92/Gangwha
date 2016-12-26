import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecondGatewayService } from '../../service';
import { AngularFire } from 'angularfire2';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent {
  buttonisOn: boolean = true;
  UserProfile: any[] = [];
  file_src: string;
  imageFile: FileList;
  nickname:string;
  finishChecker: Subject<boolean>;
  uploadTask: any;
  downloadURL: string;

  OnSubmit(input: any){
    this.buttonisOn = false;
    if(this.imageFile == null){
      const profile = {displayName: input.nickname, photoURL: "/public/img/anonymous.png"};
      this.authService.updateProfile(this.authService.UserProfile['uid'], profile)
          .then(()=>{
            this.router.navigate['home'];
          });
    }else{
      // Upload image to firebase storage
      this.uploadTask = firebase.storage().ref('profile/'+this.imageFile[0].name).put(this.imageFile[0]);

      this.uploadTask.on('state_changed',
          (snapshot)=>{},
          (err)=>{},
          ()=> {
            this.downloadURL = this.uploadTask.snapshot.downloadURL;
            this.finishChecker.next(true);
          });
    }
  }

  constructor(private router: Router, private authService: SecondGatewayService){
    this.file_src = this.authService.UserProfile['photoURL'];
    this.finishChecker = new Subject<boolean>();
    this.finishChecker.subscribe(value=>{
      if(value){
        const profile = {displayName: this.nickname, photoURL: this.downloadURL};
        this.authService.updateProfile(this.authService.UserProfile['uid'], profile)
            .then(()=>{
              //this.router.navigate['home'];
            });
      }
    });
  }

  onChange(event: any){
    let reader = new FileReader();
    this.imageFile = event.files;
    if(0 in event.files){
      this.readFile(event.files[0], reader, (result)=>{
        this.file_src = result;
      });
    }
  }

  readFile(file, reader: FileReader, callback){
    reader.onload = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

}
