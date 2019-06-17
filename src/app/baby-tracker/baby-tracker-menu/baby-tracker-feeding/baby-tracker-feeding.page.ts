import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-baby-tracker-feeding',
  templateUrl: './baby-tracker-feeding.page.html',
  styleUrls: ['./baby-tracker-feeding.page.scss'],
})
export class BabyTrackerFeedingPage implements OnInit {
  tracker_feeding_form:FormGroup;
  public babyId:any;
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private storage: Storage,
    private router:Router,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController
  ) { }

  ngOnInit() {
    this.tracker_feeding_form=new FormGroup({
      time:new FormControl(''),
      milk:new FormControl(''),
      food:new FormControl(''),
    });
    this.storage.get('babyId').then(val => {
      this.babyId = val
    })
  }
  createBabyTrackerFeeding(value){
    this.showLoading("Creating...")
    return new Promise<any>((resolve,reject)=>{
      let currenUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currenUser.uid).collection('Baby').doc(this.babyId).collection("babyFeeding").add({
        time:value.time,
        milk:value.milk,
        food:value.food
      })
      .then(res=>{
        this.loadingCtrl.dismiss();
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
  async showLoading(message){
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner:'dots',
    });
    loading.present();
  }
}
