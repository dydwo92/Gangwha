import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
@Injectable()
export class SecondGatewayService implements CanActivateChild {

    constructor(private router: Router, private af: AngularFire){}

    signinUser(email: string, passwd: string){
      this.af.auth.login({email: email, password: passwd})
          .then((success) => {
            this.router.navigate(['home']);
          })
          .catch(err => {
            console.log(err);
          });
    }

    emailUpdate(index: number, email:string){
        return this.af.database.object('/users'+(index+1)).update({email: email});
    }

    signupUser(email: string, passwd: string, index: number){
      this.af.auth.createUser({email: email, password: passwd})
          .catch(err =>{
            console.log(err.message);
          })
          .then(() => this.emailUpdate(index, email))
          .catch(err => {
            console.log(err);
          })
          .then(()=>{
            this.router.navigate(['home']);
          });
    }

    logout(){
      this.af.auth.logout();
      this.router.navigate(['/']);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean{
      return Observable.from(this.af.auth).map((auth) =>  {
          if(auth == null) {
              this.router.navigate(['/']);
              return false;
          } else {
              return true;
          }
      }).first();
    }
}
