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
    return this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("babyTips").valueChanges();
}
}
