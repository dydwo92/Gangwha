import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecondGatewayService } from '../../service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent {
  buttonisOn: boolean = true;
  UserProfile: any[] = [];

  OnSubmit(input: any){
    this.buttonisOn = false;
    const profile = {displayName: input.nickname, photoURL: "/public/img/anonymous.png"};
    this.authService.updateProfile(this.authService.UserProfile['uid'], profile)
        .then(()=>{
          this.router.navigate['../../home'];
        });
  }

  constructor(private router: Router, private authService: SecondGatewayService){}

}
