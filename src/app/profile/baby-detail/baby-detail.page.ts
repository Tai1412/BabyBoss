import { Component, OnInit, Injectable } from '@angular/core';
import { BabyServiceService } from 'src/app/services/baby-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
  babySleepingCount: any;
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
    this.babySleepingCount = this.firebaseService.getBabySleepById(this.babyId).subscribe(data => {
      this.babySleepingCount = data;
      console.log(this.babySleepingCount)
    })
    this.babyDiaperCount = this.firebaseService.getBabyDiaperById(this.babyId).subscribe(data => {
      this.babyDiaperCount = data;
      console.log(this.babyDiaperCount)
    })
    this.babyFeedingCount = this.firebaseService.getBabyFeedingrById(this.babyId).subscribe(data => {
      this.babyFeedingCount = data;
      console.log(this.babyFeedingCount)
    })
    this.babyHealthRecordCount = this.firebaseService.getBabyHealthRecordById(this.babyId).subscribe(data => {
      this.babyHealthRecordCount = data;
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
    this.firebaseService.deleteBabyService(this.babyId)
      .then(res => {
        this.router.navigate(['/tabs/profile']);
        this.storage.remove('babyId');
        this.storage.remove('babyDetail');
        this.showToast("Successful Deleted Baby");
      })
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
}
