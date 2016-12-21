import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
@Injectable()
export class SecondGatewayService implements CanActivateChild {
    UserProfile: any[] = [];
    getProfile = new Subject();

    constructor(private router: Router, private af: AngularFire){
      this.UserProfile['isLoggedIn'] = false;
      af.auth.subscribe((auth)=>{
        this.UserProfile['uid'] = auth.uid;
        af.database.list('/users/'+auth.uid).subscribe((snapshot)=>{
          snapshot.forEach(snapshot =>{
            this.UserProfile[snapshot.$key] = snapshot.$value;
          });
          this.UserProfile['isLoggedIn'] = true;
          this.getProfile.next(this.UserProfile);
        });
      });
    }

    signinUser(email: string, passwd: string){
      this.af.auth.login({email: email, password: passwd})
          .then((success) => {
            this.router.navigate(['home']);
          })
          .catch(err => {
            console.log(err);
          });
    }

    updateProfile(uid: string,profile: any){
      return this.af.database.list('/users/').update(uid, profile);
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
