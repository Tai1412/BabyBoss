import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class TipsForDadServiceService {

  constructor(
    public afs:AngularFirestore
  ) { }
  getTipsForDad(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("tipsForDad").snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getTipsForDadDetail(tipId: string) {
    return this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("tipsForDad").doc(tipId).valueChanges();
  }
}
