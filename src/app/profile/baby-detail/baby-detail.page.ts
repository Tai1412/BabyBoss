import { Component, OnInit, Injectable } from '@angular/core';
import { BabyServiceService } from 'src/app/services/baby-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import Chart from 'chart.js';

@Component({
  selector: 'app-baby-detail',
  templateUrl: './baby-detail.page.html',
  styleUrls: ['./baby-detail.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class BabyDetailPage implements OnInit {
  public babyId: string = this.route.snapshot.paramMap.get('id');
  public getBabyId= this.storage.get("babyId");
  public getbabyDetail = this.storage.get("babyDetail");
  public previousBaby:string;
  updateBabyForm: FormGroup;
  updateBabySelectForm:FormGroup;
  babyMemoryCount: any;
  public babySleepingCount:Array<any>=[];;
  babyDiaperCount: any;
  babyHealthRecordCount: any;
  babyFeedingCount: any;
  baby: any;
  public selectedId: any;
  validation_messages = {
    'ageType': [
      { type: 'required', message: 'Age Type is required' },
    ],
    'age':[
      {type:'required', messages:"Age is require"}
    ]
  };
  constructor(
    private firebaseService: BabyServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public router: Router,
    private toastCtrl: ToastController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl:LoadingController,

  ) {
    this.baby = this.firebaseService.getBabyDetail(this.babyId).subscribe(data => {
      this.baby = data;
      this.updateBaby(this.baby.age, this.baby.name, this.baby.gender,this.baby.ageType);
      this.updateBabySelect(this.baby.chooseBaby)
      console.log(this.babyId)
    })
    this.babyMemoryCount = this.firebaseService.getBabyMemoryById(this.babyId).subscribe(data => {
      this.babyMemoryCount = data;
      console.log(this.babyMemoryCount)
    })
    this.firebaseService.getBabySleepById(this.babyId).subscribe(data => {
      this.babySleepingCount = data;
      this.totalBAc();
      console.log("Sleep count",this.babySleepingCount)
    })
    this.babyDiaperCount = this.firebaseService.getBabyDiaperById(this.babyId).subscribe(data => {
      this.babyDiaperCount = data;
      this.totalBAc();
      console.log(this.babyDiaperCount)
    })
    this.babyFeedingCount = this.firebaseService.getBabyFeedingrById(this.babyId).subscribe(data => {
      this.babyFeedingCount = data;
      this.totalBAc();
      console.log(this.babyFeedingCount)
    })
    this.babyHealthRecordCount = this.firebaseService.getBabyHealthRecordById(this.babyId).subscribe(data => {
      this.babyHealthRecordCount = data;
      this.totalBAc();
      console.log(this.babyHealthRecordCount)
    })
    this.updateBabyForm = this.formBuilder.group({
      age: new FormControl(this.baby.age,Validators.required),
      ageType:new FormControl(this.baby.ageType,Validators.required),
      name: new FormControl(this.baby.name),
      gender: new FormControl(this.baby.gender),
    });
    this.updateBabySelectForm=this.formBuilder.group({
      chooseBaby: new FormControl(this.baby.chooseBaby)
    });
  }

  ngOnInit() {
  }
  ionViewWillEnter() {

    this.storage.get("babyId").then(val=>{
      this.previousBaby=val
    })
  }
  updateBaby(age, name, gender,ageType) {
    this.updateBabyForm.patchValue({
      age: age,
      ageType:ageType,
      name: name,
      gender: gender,
    })
  }
  updateBabySelect(chooseBaby){
    this.updateBabySelectForm.patchValue({
      chooseBaby: chooseBaby
    })
  }
  updateBabySubmit(value) {
    let data = {
      age: value.age,
      ageType:value.ageType,
      name: value.name,
      gender: value.gender,
    }
    this.firebaseService.updateBabyDetailService(this.babyId, data)
      .then(
        res => {
          this.getBabyId.then(val=>{
            this.getBabyId=val
            if(this.getBabyId!=null)
            {
              this.storage.set("babyDetail",this.baby)
            }
            else
            {
              this.storage.remove("babyDetail")
            }
          })
          this.router.navigate(['/tabs/profile']);
          this.showToast("Successful Updated Baby Information");
        }
      )
  }
  selectBaby(value)
  {
    let data = {
      chooseBaby: value.chooseBaby,
    }
    this.firebaseService.updateBabyDetailService(this.babyId, data)
      .then(
        res => {
          if (this.baby.chooseBaby == true) {
            if(this.getBabyId&&this.getbabyDetail)
            {
              this.storage.remove("babyId");
              this.storage.remove("babyDetail");
              this.firebaseService.deleteFieldChooseBaby(this.previousBaby).then((res)=>
              {
              })
            }
            this.storage.set("babyId",this.babyId);
            this.storage.set("babyDetail",this.baby);
          }
          else{
            this.storage.remove("babyId");
              this.storage.remove("babyDetail");
          }
          this.router.navigate(['/tabs/profile']);
          this.showToast("Successful Selected Baby");
        }
      )
  }
  deleteBaby() {
    this.showConfirm();
  }
  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  goBack() {
    // if(this.check==true)
    // {
    //   this.check=true;
    // }
    // else
    // {
    //   this.check=false;
    // }
    this.router.navigate(['/tabs/profile']);
  }
  //   changeSelectBaby(){
  //     if(this.check==false)
  //     {
  //       this.check=false;
  //       this.storage.remove("babyId");
  //       this.storage.remove("babyDetail");
  //       console.log(this.check)
  //     }
  //     else
  //     {
  //       this.check=true;
  //       this.storage.set("babyId",this.babyId);
  //       this.storage.set("babyDetail",this.baby);
  //       console.log(this.check)
  //     }
  // }
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
            this.firebaseService.deleteBabyService(this.babyId)
            .then((res) =>{
                this.loadingCtrl.dismiss()
                this.router.navigate(['/tabs/profile']);
                this.storage.remove('babyId');
                this.storage.remove('babyDetail');
                this.showToast("Successful Deleted Baby");
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
  totalBAc() {
    var ctx = (<any>document.getElementById('babyActivityChart')).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart
        type: 'pie',
        data: {
            labels: ["Baby Sleep Track", "Baby Diaper Track", "Baby Feed Track", "Baby Health Track", "Baby Memory"],
            datasets: [{
              label: "Baby activity track",
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              data: [(this.babySleepingCount.length),(this.babyDiaperCount.length),(this.babyFeedingCount.length),(this.babyHealthRecordCount.length),(this.babyMemoryCount.length)],
              borderWidth: 1
            }]
       }
    });
  }
}
