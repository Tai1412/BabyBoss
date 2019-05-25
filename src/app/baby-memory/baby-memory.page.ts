import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-baby-memory',
  templateUrl: './baby-memory.page.html',
  styleUrls: ['./baby-memory.page.scss'],
})
export class BabyMemoryPage implements OnInit {
  myPhoto: any;
  myImageList: Array<any> = [];
  public babyId:any;
  public babyList: Array<any> = [];
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: Storage
  ) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.storage.get('babyDetail').then(val => {
      this.babyList = val
      console.log(this.babyList);

    })
    this.storage.get('babyId').then(val => {
      this.babyId = val
      console.log(this.babyId);
      this.getImages().then(data => {
        this.myImageList = data;
      })
    })
    
  }

  getImages() {
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("images").snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }

}
