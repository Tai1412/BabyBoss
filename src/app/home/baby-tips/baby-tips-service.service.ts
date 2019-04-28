import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BabyTipsServiceService {

  constructor(
    public afs:AngularFirestore
  ) { }
  getBabyTips(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("babyTips").snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getBabyTipsDetail(tipId: string) {
    return this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("babyTips").doc(tipId).valueChanges();
  }
}
