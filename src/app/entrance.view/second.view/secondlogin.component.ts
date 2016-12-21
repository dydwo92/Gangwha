import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecondGatewayService } from '../../service';

@Component({
  selector: 'app-secondlogin',
  templateUrl: './secondlogin.component.html',
  styleUrls: ['./secondlogin.component.css']
})
export class SecondLoginComponent {
  userList = [];

  constructor(private router: Router, private authService: SecondGatewayService) {
    this.authService.isAuthenticated().subscribe((success) => {
      if(success){
        this.router.navigate(['home']);
      }
    });

    firebase.database().ref('users/').once('value')
        .then(snapshot => {
          this.userList = snapshot.val();
          this.userList.splice(0,1);
        });
  }

  OnClick(passwd: string){
    this.authService.signinUser('yj@gangwha.com', passwd);
  }
}
