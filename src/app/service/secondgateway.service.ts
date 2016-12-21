import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

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

    isAuthenticated(): Observable<boolean>{
      const subject = new Subject<boolean>();
        firebase.auth().onAuthStateChanged(function(user){
          if(user){
            subject.next(true);
          }else{
            subject.next(false);
          }
        });
        return subject.asObservable();
    }

    logout(){
      firebase.auth().signOut().then(function(){
        this.router.navigate(['/']);
      });
    }

    canActivate(): Observable<boolean> | boolean{
      return this.isAuthenticated().first();
    }
}
