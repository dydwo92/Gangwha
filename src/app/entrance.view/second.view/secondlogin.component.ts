import { Component } from '@angular/core';
import { SecondGatewayService } from '../../service';

@Component({
  selector: 'app-secondlogin',
  templateUrl: './secondlogin.component.html',
  styleUrls: ['./secondlogin.component.css']
})
export class SecondLoginComponent {
  userList = [];

  constructor(private authService: SecondGatewayService) {
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
