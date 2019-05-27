import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-baby-tracker-sleep',
  templateUrl: './baby-tracker-sleep.page.html',
  styleUrls: ['./baby-tracker-sleep.page.scss'],
})
export class BabyTrackerSleepPage implements OnInit {
  sleep_form:FormGroup;
  public babyId:any;
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.sleep_form=new FormGroup({
      startTime:new FormControl(''),
      endTime:new FormControl(''),
    });
    this.storage.get('babyId').then(val => {
      this.babyId = val
    })
  }
  createBabyTrackerSleep(value){
    return new Promise<any>((resolve,reject)=>{
      let currenUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currenUser.uid).collection('Baby').doc(this.babyId).collection("babySleep").add({
        startTime:value.startTime,
        endTime:value.endTime
      })
      .then(res=>{
        resolve(res)
      })
    })
  }

}
