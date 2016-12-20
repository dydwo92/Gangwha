import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SecondGatewayService implements CanActivate {
    isLoggedIn: boolean;

    constructor(private router: Router) {}

    signinUser(email: string, passwd: string){
      firebase.auth().signInWithEmailAndPassword(email, passwd)
          .then(success => {
            this.router.navigate(['/home']);
          })
          .catch(err => {
            console.log(err);
          });
    }

    isAuthenticated(){
        var user = firebase.auth().currentUser;
        if(user){
          return true;
        }else{
          return false;
        }
    }

    logout(){
      firebase.auth().signOut();
      this.router.navigate(['/']);
    }

    canActivate(): boolean{
      return this.isAuthenticated();
    }
}
