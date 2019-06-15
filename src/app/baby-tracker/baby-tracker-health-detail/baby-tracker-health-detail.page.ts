import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-baby-tracker-health-detail',
  templateUrl: './baby-tracker-health-detail.page.html',
  styleUrls: ['./baby-tracker-health-detail.page.scss'],
})
export class BabyTrackerHealthDetailPage implements OnInit {
  public babyTrackerHealthId:string = this.route.snapshot.paramMap.get('RecordId');
  public babyId:any;
  babyHealthTracker:any;
  health_record_form:FormGroup

  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private route:ActivatedRoute,
    public router:Router,
    private storage: Storage,
    private toastCtrl:ToastController
  ) {
    this.health_record_form=new FormGroup({
      time:new FormControl(''),
      healthRecord:new FormControl(''),
    });
   }

  ngOnInit() {
    this.storage.get('babyId').then(val => {
      this.babyId = val
      this.babyHealthTracker=this.getBabyHealthRecordDetail(this.babyTrackerHealthId).subscribe(data=>{
        this.babyHealthTracker=data;
        this.updateHealthBabyRecord(this.babyHealthTracker.time,this.babyHealthTracker.healthRecord)
        console.log("data",this.babyHealthTracker.time)
      });
    })
  }
  updateHealthBabyRecord(time, healthRecord) {
    this.health_record_form.patchValue({
      time: time,
      healthRecord:healthRecord,
    })
  }
  getBabyHealthRecordDetail(babyTrackerHealthId: string) {
    let currentUser=this.afAuth.auth.currentUser;
    return this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyHealthRecord").doc(babyTrackerHealthId).valueChanges();
  }
  deleteHealthRecord(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyHealthRecord").doc(this.babyTrackerHealthId).delete()
      .then((res) => 
      {
        this.router.navigate(['/tabs/baby-tracker']);      })
      .catch((err)=>{
         reject(err)
      });
    })
  }
  updateHealthBabyRecordSubmit(value)
  {
    return new Promise<any>((resolve,reject)=>{
      let currentUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyHealthRecord").doc(this.babyTrackerHealthId).update({
        time:value.time,
        healthRecord:value.healthRecord,
      })
      .then((res) => 
      {
        this.router.navigate(['/tabs/baby-tracker']); 
        this.showToast("Updated Baby Health Record Successfully")
        resolve(res)
      })
      .catch((err)=>{
         reject(err)
      });
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
