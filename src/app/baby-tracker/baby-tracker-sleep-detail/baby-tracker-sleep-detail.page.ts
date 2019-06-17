import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-baby-tracker-sleep-detail',
  templateUrl: './baby-tracker-sleep-detail.page.html',
  styleUrls: ['./baby-tracker-sleep-detail.page.scss'],
})
export class BabyTrackerSleepDetailPage implements OnInit {
  public babyTrackerSleepId:string = this.route.snapshot.paramMap.get('SleepId');
  public babyId:any;
  sleep_form:FormGroup;
  babyTrackerSleep:any;
  constructor(
    private afAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private route:ActivatedRoute,
    public router:Router,
    private storage: Storage,
    private toastCtrl:ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl:LoadingController,
  ) { }

  ngOnInit() {
    this.sleep_form=new FormGroup({
      startTime:new FormControl(''),
      endTime:new FormControl(''),
    });
    this.storage.get('babyId').then(val => {
      this.babyId = val
      this.babyTrackerSleep=this.getBabyTrackerSleepDetail(this.babyTrackerSleepId).subscribe(data=>{
        this.babyTrackerSleep=data;
        this.updateBabyTrackerSleep(this.babyTrackerSleep.startTime,this.babyTrackerSleep.endTime)
      });
    })
  }
  updateBabyTrackerSleep(startTime, endTime) {
    this.sleep_form.patchValue({
      startTime: startTime,
      endTime:endTime,
    })
  }
  getBabyTrackerSleepDetail(babyTrackerSleepId: string) {
    let currentUser=this.afAuth.auth.currentUser;
    return this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babySleep").doc(babyTrackerSleepId).valueChanges();
  }
  deleteBabyTrackerSleep(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babySleep").doc(this.babyTrackerSleepId).delete()
      .then((res) => 
      {
        resolve(res);
      })
      .catch((err)=>{
         reject(err)
      });
    })
  }
  delete(){
    this.showConfirm();
  }
  updateBabyTrackerSleepSubmit(value)
  {
    return new Promise<any>((resolve,reject)=>{
      let currentUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babySleep").doc(this.babyTrackerSleepId).update({
        startTime:value.startTime,
        endTime:value.endTime,
      })
      .then((res) => 
      {
        this.router.navigate(['/tabs/baby-tracker']); 
        this.showToast("Updated Baby Sleep Successfully")
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
  async showLoading(message){
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner:'dots',
    });
    loading.present();
  }
  async showConfirm(){
    const confirm = await this.alertCtrl.create({
      header: 'Confirm',
      subHeader: 'Do you want to delete ?',
      message:'Its will be permanently deleted',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',//if yes run delete memory
          handler: () => {
            this.showLoading("Proccessing....")
            this.deleteBabyTrackerSleep()
            .then((res) =>{
                this.loadingCtrl.dismiss()
                this.showToast("Your baby-tracker-sleep has been deleted");
                this.router.navigate(["tabs/baby-tracker"]);
               })
             .catch((err) =>{
                console.log(err)
             });
          }
        }
      ]
    });
    confirm.present();
  }

}
