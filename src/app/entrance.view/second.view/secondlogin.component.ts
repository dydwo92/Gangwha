import {
  Component,
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/core';
import { Router } from '@angular/router';
import { SecondGatewayService } from '../../service';

@Component({
  animations:[
    trigger('userSelectChanged',[
      state('true', style({ opacity: 1})),
      state('false', style({ opacity: 0})),
      transition('*=>*', animate('.5s'))
    ])
  ],
  selector: 'app-secondlogin',
  templateUrl: './secondlogin.component.html',
  styleUrls: ['./secondlogin.component.css']
})
export class SecondLoginComponent {
  userList = [];
  selectedUser: any;
  userSelected: boolean = false;
  userHasEmail: boolean = false;

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

  onUserClick(index: number){
    this.userSelected = true;
    this.selectedUser = this.userList[index];
    this.selectedUser.index = index;
    if(this.selectedUser.email == null){
      this.userHasEmail = false;
    }else{
      this.userHasEmail = true;
    }
  }

  onSubmit(form: any){
    if(this.selectedUser){
      if(this.selectedUser.email == null){
        // User sign up
        this.authService.signupUser(form.email, form.passwd, this.selectedUser.index);
      }else{
        // User sign in
        this.authService.signinUser(this.selectedUser.email, form.passwd);
      }
    }
  }

}
