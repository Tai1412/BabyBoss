import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    private storage: Storage,
    private router:Router,
    private toastCtrl:ToastController
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
        this.router.navigate(["tabs/baby-tracker"]);
        this.showToast("Added Successfully!")
        resolve(res)
      })
    })
  }

  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
