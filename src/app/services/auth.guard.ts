import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private router: Router,private afAuth:AngularFireAuth) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(user => { //check user state persist
        if (user) {//if current user, allow to go to the other page
          resolve(true);
        } 
        else {//if not ,navigate back to the login until sign in
          this.router.navigate(['/login']);
          reject('No Logged in');
        }
      }); 
    });
  }
  
}
