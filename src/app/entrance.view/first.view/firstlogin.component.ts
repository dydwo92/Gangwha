import {
  Component,
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { FirstGatewayService } from '../../service';

@Component({
  animations: [
    trigger('CorrectIdChanged',[
        state('true', style({ opacity: 1})),
        state('false', style({ opacity: 0})),
        transition('*=>*', animate('.5s'))
      ])
  ],
  selector: 'app-firstlogin',
  templateUrl : './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.css']
})
export class FirstLoginComponent {
  CorrectId: boolean = false;

  constructor(private firstGateway: FirstGatewayService) {}

  checkId(input){
    const hashed_string = Md5.hashStr(input.target.value);
    if(hashed_string == 'b1db86af05f0f4d2d8ace948315ee187'){
      this.firstGateway.setState(true);
      this.CorrectId = true;
    }else{
      this.firstGateway.setState(false);
      this.CorrectId = false;
    }
  }

}
