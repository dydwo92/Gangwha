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
import { AngularFire } from 'angularfire2';

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

  constructor(private router: Router, private authService: SecondGatewayService, private af: AngularFire) {
    // Check already logged in
    this.af.auth.subscribe((success)=>{
      if(success){
        this.router.navigate(['home']);
      }
    });
  }

  OnSubmit(input: any){
    this.authService.signinUser(input.email, input.passwd);
  }

}
