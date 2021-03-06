import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-baby-tracker-diaper-detail',
  templateUrl: './baby-tracker-diaper-detail.page.html',
  styleUrls: ['./baby-tracker-diaper-detail.page.scss'],
})
export class BabyTrackerDiaperDetailPage implements OnInit {
  public babyTrackerDiaperId:string = this.route.snapshot.paramMap.get('DiaperId');
  tracker_diaper_form:FormGroup;
  public babyId:any;
  babyTrackerDiaper:any;

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
    this.tracker_diaper_form=new FormGroup({
      time:new FormControl(''),
      status:new FormControl(''),
    });
    this.storage.get('babyId').then(val => {
      this.babyId = val
      this.babyTrackerDiaper=this.getBabyTrackerDiaperDetail(this.babyTrackerDiaperId).subscribe(data=>{
        this.babyTrackerDiaper=data;
        this.updateTrackerDiaper(this.babyTrackerDiaper.time,this.babyTrackerDiaper.status)
        // console.log("data",this.babyHealthTracker.time)
      });
    })
  }
  updateTrackerDiaper(time, status) {
    this.tracker_diaper_form.patchValue({
      time:time,
      status:status,
    })
  }
  getBabyTrackerDiaperDetail(babyTrackerDiaperId: string) {
    let currentUser=this.afAuth.auth.currentUser;
    return this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyDiaper").doc(babyTrackerDiaperId).valueChanges();
  }
  deleteBabyTrackerDiaper(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyDiaper").doc(this.babyTrackerDiaperId).delete()
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
  updateBabyTrackerDiaperSubmit(value)
  {
    return new Promise<any>((resolve,reject)=>{
      let currentUser=this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(currentUser.uid).collection('Baby').doc(this.babyId).collection("babyDiaper").doc(this.babyTrackerDiaperId).update({
        time: value.time,
        status:value.status,
      })
      .then((res) => 
      {
        this.router.navigate(['/tabs/baby-tracker']); 
        this.showToast("Updated Baby Diaper Successfully")
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
            this.deleteBabyTrackerDiaper()
            .then((res) =>{
                this.loadingCtrl.dismiss()
                this.showToast("Your baby-tracker-diaper has been deleted");
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
