import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-baby-tracker-diaper',
  templateUrl: './baby-tracker-diaper.page.html',
  styleUrls: ['./baby-tracker-diaper.page.scss'],
})
export class BabyTrackerDiaperPage implements OnInit {
  tracker_diaper_form:FormGroup;
  public babyId:any;
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private storage: Storage,
    private router:Router,
    private toastCtrl:ToastController
  ) { }

  ngOnInit() {
    this.tracker_diaper_form=new FormGroup({
      time:new FormControl(new Date().toISOString()),
      status:new FormControl(''),
    });
    this.refreshForm()
    this.storage.get('babyId').then(val => {
      this.babyId = val
    })
  }
  createBabyTrackDiaper(value){
    return new Promise<any>((resolve,reject)=>{
      let currenUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currenUser.uid).collection('Baby').doc(this.babyId).collection("babyDiaper").add({
        time:value.time,
        status:value.status
      })
      .then(res=>{
        this.router.navigate(["tabs/baby-tracker"]);
        this.showToast("Added Successfully");
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
  refreshForm(){
    this.tracker_diaper_form.patchValue({
      time:new Date(),
      status:status, // does not work
  });
  }

}
