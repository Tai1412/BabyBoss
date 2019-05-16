import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public afAuth: AngularFireAuth,
    public afs:AngularFirestore
  ) 
  { }

  //email Register
  async emailRegister(userValue){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(userValue.email, userValue.password)
      .then(()=>{
        let currentUser=this.afAuth.auth.currentUser;
        this.afs.collection("User").doc(currentUser.uid).set({
          email:userValue.email
        })
      }).then(res=>{resolve(res);})
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
            email:"",
            phoneNumber:"",
            provider:""
         };
         if(user){
           userModel.id=user.uid;
           userModel.name=user.displayName;
           userModel.email=user.email;
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
      user.updateEmail(value.email).then(()=>{
        this.afs.collection("User").doc(user.uid).update({
          email:value.email
        })
      }).catch((err)=>{
        reject(err)
      })

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
