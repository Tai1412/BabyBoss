import { Component, OnInit } from '@angular/core';
import { BabyServiceService } from '../services/baby-service.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { reject } from 'q';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-add-first-baby-form',
  templateUrl: './add-first-baby-form.page.html',
  styleUrls: ['./add-first-baby-form.page.scss'],
})
export class AddFirstBabyFormPage implements OnInit {
  addFirstBabyForm: FormGroup;

  constructor(
   private firebaseService:BabyServiceService,
   private formBuilder: FormBuilder,
   public router:Router,
   private loadingCtrl: LoadingController,
  private toastCtrl:ToastController,

  ) { }

  ngOnInit() {
    this.addFirstBabyForm = this.formBuilder.group({
      age: new FormControl(Validators.required),
      ageType:new FormControl(Validators.required),
      name: new FormControl(''),
      gender: new FormControl('Gender not choose'),
      });
  }
  onSubmit(value){
    let data = {
      age: value.age,
      ageType:value.ageType,
      name: value.name,
      gender:value.gender,
    }
    this.showLoading("Processing");
    this.firebaseService.addFirstBabyService(data)
    .then(
      res => {
        this.router.navigate(['/tabs']);
        this.showToast("Successful Add Baby");
      }
    )
    .catch(err=>{
      reject(err)
    })
  }
  goToProfilePage(){
    this.router.navigate(['/tabs/profile']);
  }
  async showLoading(message) {
    const loading =await this.loadingCtrl.create({
      spinner: "circles",
      message: message,
      translucent: true,
      duration:1000,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    await loading.dismiss();
  }
  dismiss(){
    this.loadingCtrl.dismiss();
  }
  async showToast(message){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
