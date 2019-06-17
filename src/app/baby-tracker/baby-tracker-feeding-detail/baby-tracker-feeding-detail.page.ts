import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-baby-tracker-feeding-detail',
  templateUrl: './baby-tracker-feeding-detail.page.html',
  styleUrls: ['./baby-tracker-feeding-detail.page.scss'],
})
export class BabyTrackerFeedingDetailPage implements OnInit {
  public babyTrackerFeedingId:string = this.route.snapshot.paramMap.get('FeedingId');
  public babyId:any;
  babyTrackerFeeding:any;
  tracker_feeding_form:FormGroup;
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
    this.tracker_feeding_form=new FormGroup({
      time:new FormControl(''),
      milk:new FormControl(''),
      food:new FormControl(''),
    });
    this.storage.get('babyId').then(val => {
      this.babyId = val
      this.babyTrackerFeeding=this.getBabyTrackerFeedingDetail(this.babyTrackerFeedingId).subscribe(data=>{
        this.babyTrackerFeeding=data;
        this.updateBabyTrackerFeeding(this.babyTrackerFeeding.time,this.babyTrackerFeeding.milk,this.babyTrackerFeeding.food)
      });
    })
  }
  updateBabyTrackerFeeding(time, milk,food) {
    this.tracker_feeding_form.patchValue({
      time: time,
      milk:milk,
      food:food,
    })
  }
  getBabyTrackerFeedingDetail(babyTrackerFeedingId: string) {
    let currentUser=this.afAuth.auth.currentUser;
    return this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyFeeding").doc(babyTrackerFeedingId).valueChanges();
  }
  deleteBabyTrackerFeeding(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyFeeding").doc(this.babyTrackerFeedingId).delete()
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
  updateBabyTrackerFeedingSubmit(value)
  {
    return new Promise<any>((resolve,reject)=>{
      let currentUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyFeeding").doc(this.babyTrackerFeedingId).update({
        time:value.time,
        milk:value.milk,
        food:value.food,
      })
      .then((res) => 
      {
        this.router.navigate(['/tabs/baby-tracker']); 
        this.showToast("Updated Baby Feeding Successfully")
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
            this.deleteBabyTrackerFeeding()
            .then((res) =>{
                this.loadingCtrl.dismiss()
                this.showToast("Your baby-tracker-feeding has been deleted");
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
