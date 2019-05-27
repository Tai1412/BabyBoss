import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-baby-tracker-health',
  templateUrl: './baby-tracker-health.page.html',
  styleUrls: ['./baby-tracker-health.page.scss'],
})
export class BabyTrackerHealthPage implements OnInit {
  health_record_form:FormGroup;
  public babyId:any;
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.health_record_form=new FormGroup({
      time:new FormControl(''),
      healthRecord:new FormControl(''),
    });
    this.storage.get('babyId').then(val => {
      this.babyId = val
    })
  }
  createBabyTrackerHealth(value){
    return new Promise<any>((resolve,reject)=>{
      let currenUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currenUser.uid).collection('Baby').doc(this.babyId).collection("babyHealthRecord").add({
        time:value.time,
        healthRecord:value.healthRecord
      })
      .then(res=>{
        resolve(res)
      })
    })
  }

}
