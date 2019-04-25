import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TipsForDadModel } from './tips-for-dad-model';

@Injectable({
  providedIn: 'root'
})
export class TipsForDadServiceService {

  constructor(
    public afs:AngularFirestore
  ) { }
  getTipsForDad():AngularFirestoreCollection<TipsForDadModel>{
      return this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("tipsForDad");
  }
  getTipsForDadDetail(tipId: string):AngularFirestoreDocument<TipsForDadModel> {
    return this.afs.collection('tips').doc("e4iwSiy3N8NWUjZeduZh").collection("tipsForDad").doc(tipId);
  }
}
