import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class FirstGatewayService implements CanActivate {
  passport: boolean = false;

  constructor(private router: Router) {}

  setState(input: boolean){
    this.passport = input;
  }

  canActivate(){
      if(this.passport == false){
        this.router.navigate(['']);
      }

      return this.passport;
  }
}
