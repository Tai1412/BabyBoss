import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class TipsForMomServiceService {

  constructor(
    public afs:AngularFirestore
  ) { }
getTipsForMom(){
  return new Promise<any>((resolve, reject) => {
    this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("tipsForMom").snapshotChanges()
    .subscribe(snapshots => {
      resolve(snapshots);
    })
  });
}
getTipsForMomDetail(tipId: string) {
  return this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("tipsForMom").doc(tipId).valueChanges();
}
}
