import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BabyServiceService {

  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore
  ) { }

  // createBabyMemory(value,picture){
  //   return new Promise<any>((resolve,reject)=>{
  //     let currentUser=this.afAuth.auth.currentUser;
  //     this.afs.collection('User').doc(currentUser.uid).collection('images').add({
  //       title:value.title,
  //       picture:picture
  //     })
  //     .then(
  //       res=>{
  //         resolve(res)
  //       },
  //       error=>{
  //         reject(error)
  //       }
  //     )
  //   })
  // }
}
