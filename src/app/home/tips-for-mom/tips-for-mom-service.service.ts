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
    return this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("tipsForMom").valueChanges();
}
}
