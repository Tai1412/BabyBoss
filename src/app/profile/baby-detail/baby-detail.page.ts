import { Component, OnInit } from '@angular/core';
import { BabyServiceService } from 'src/app/services/baby-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-baby-detail',
  templateUrl: './baby-detail.page.html',
  styleUrls: ['./baby-detail.page.scss'],
})
export class BabyDetailPage implements OnInit {
  public babyId:string=this.route.snapshot.paramMap.get('id');
  updateBabyForm:FormGroup
  baby:any;
  constructor(
    private firebaseService:BabyServiceService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    public router:Router,
    private toastCtrl:ToastController,

  ) {
    this.baby=this.firebaseService.getBabyDetail(this.babyId).subscribe(data=>{
      this.baby=data;
      this.updateBaby(this.baby.age,this.baby.name,this.baby.gender);
      console.log(this.baby)
    })
    this.updateBabyForm = this.formBuilder.group({
      age: new FormControl(this.baby.age),
      name: new FormControl(this.baby.name),
      gender: new FormControl(this.baby.gender),
      });
   }

  ngOnInit() {
    
  }
  updateBaby(age,name,gender){
    this.updateBabyForm.patchValue({
      age:age,
      name:name,
      gender:gender
    })
  }
  updateBabySubmit(value){
    let data = {
      age: value.age,
      name: value.name,
      gender:value.gender,
    }
    this.firebaseService.updateBabyDetailService(this.babyId,data)
    .then(
      res => {
        this.router.navigate(['/tabs/profile']);
        this.showToast("Successful Updated Baby Information");
      }
    )
  }
  deleteBaby(){
    this.firebaseService.deleteBabyService(this.babyId)
    .then(res=>{
      this.router.navigate(['/tabs/profile']);
      this.showToast("Successful Deleted Baby");
    })
  }
  async showToast(message){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
