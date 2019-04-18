import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public afAuth: AngularFireAuth,
  ) 
  { }

  //email Register
  async emailRegister(userValue){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(userValue.email, userValue.password)
      .then(res => {resolve(res);})
      .catch((error) =>{reject(error)});
    })
   }
  
   //email login
   async emailLogin(userValue){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(userValue.email, userValue.password)
      .then(res => {resolve(res);})
      .catch((error) =>{reject(error)});
    })
   }
   async getCurrentUser(){
     return new Promise<any>((resolve,reject)=>{
       this.afAuth.auth.onAuthStateChanged(user=>{
         let userModel={//object
            id:"",
            name:"",
            phoneNumber:"",
            provider:""
         };
         if(user){
           userModel.id=user.uid;
           userModel.name=user.displayName;
           userModel.phoneNumber=user.phoneNumber;
           userModel.provider=user.providerData[0].providerId;
           return resolve(userModel);
         }
         else
           reject("No log in");
       })
      })
   }
   updateUserProfiles(value: any){
    return new Promise<any>((resolve, reject) => {
      let user = this.afAuth.auth.currentUser;
      user.updateProfile({
        displayName: value.name
      }).then(res => {
        resolve(res)
      })
      .catch((err) =>{
        reject(err)
     });
    })
  }

   //logout
   async logout()
  {
    return new Promise((resolve, reject) => {
      if(this.afAuth.auth.currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{reject();}
    });
  }
}
