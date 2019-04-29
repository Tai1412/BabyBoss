import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BabyRecipesServiceService {

  constructor(
    public afs:AngularFirestore,
  ) { }

  getBabyRecipes()
  {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('recipes').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getBabyRecipesDetail(tipId: string) {
    return this.afs.collection('recipes').doc(tipId).valueChanges();
  }
}
