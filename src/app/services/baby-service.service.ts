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
  addFirstBabyService(value){
    let currentUser=this.afAuth.auth.currentUser;
    return new Promise<any>((resolve, reject) => {
      this.afs.collection("User").doc(currentUser.uid).collection("Baby").add({
        gender:value.gender,
        age:value.age,
        name:value.name,
      })
      .then((res)=>{
        resolve(res)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  }
  getListBabyService(){
    let currentUser=this.afAuth.auth.currentUser;
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('User').doc(currentUser.uid).collection("Baby").snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getBabyDetail(babyId: string) {
    let currentUser=this.afAuth.auth.currentUser;
    return this.afs.collection('User').doc(currentUser.uid).collection("Baby").doc(babyId).valueChanges();
  }
  updateBabyDetailService(babyId, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(babyId).update(value)
      .then((res) => 
      {
        resolve(res)
      })
      .catch((err)=>{
         reject(err)
      });
    })
  }

  deleteBabyService(babyId){
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(babyId).delete()
      .then((res) => 
      {
        resolve(res) 
      })
      .catch((err)=>{
         reject(err)
      });
    })
  }
}
