import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { forkJoin } from 'rxjs';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class BabyTrackerServiceService {
  public babyId:any;
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private storage:Storage
  ) { 
  }

  getBabyTrackerHealth()
  {
    return new Promise<any>((resolve, reject) => {
      let currentUser=this.afAuth.auth.currentUser;
      this.storage.get('babyId').then(val=>{
        this.babyId=val
      })
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyHealthRecord").snapshotChanges()
        .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getData(){
    let response1=this.getBabyTrackerHealth();
    return forkJoin([response1]);
  }
}
