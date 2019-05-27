import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BabyDetailPage} from '../profile/baby-detail/baby-detail.page';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-baby-tracker',
  templateUrl: './baby-tracker.page.html',
  styleUrls: ['./baby-tracker.page.scss'],
})
export class BabyTrackerPage implements OnInit {
  public babyList:Array<any>=[];
  public babyId:any;
  data1:any;
  data2:any;
  data3:any;
  data4:any;
  constructor(
    
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private storage:Storage,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('babyDetail').then(val =>{
        this.babyList=val
        console.log(this.babyList)
    })
    this.storage.get('babyId').then(val => {
      this.babyId = val
      console.log(this.babyId);
      this.getData1();
    })
    
  }
  getData1(){
    this.getData().subscribe(res=>{
      this.data1=res[0];
      this.data2=res[1];
      this.data3=res[2];
      this.data4=res[3];
    })
  }
  getBabyTrackerHealth()
  {
    return new Promise<any>((resolve, reject) => {
      let currentUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyHealthRecord").snapshotChanges()
        .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getBabyTrackerSleep()
  {
    return new Promise<any>((resolve, reject) => {
      let currentUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babySleep").snapshotChanges()
        .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getBabyTrackerDiaper()
  {
    return new Promise<any>((resolve, reject) => {
      let currentUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyDiaper").snapshotChanges()
        .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getBabyTrackerFeeding()
  {
    return new Promise<any>((resolve, reject) => {
      let currentUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyFeeding").snapshotChanges()
        .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getData(){
    let response1=this.getBabyTrackerHealth();
    let response2=this.getBabyTrackerSleep();
    let response3=this.getBabyTrackerDiaper();
    let response4=this.getBabyTrackerFeeding();
    return forkJoin([response1,response2,response3,response4]);
  }
  

}
