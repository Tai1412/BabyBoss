import { Component, OnInit } from '@angular/core';
import { BabyServiceService } from '../services/baby-service.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { reject } from 'q';
import { LoadingController } from '@ionic/angular';
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


  ) { }

  ngOnInit() {
    this.addFirstBabyForm = this.formBuilder.group({
      age: new FormControl(''),
      name: new FormControl(''),
      gender: new FormControl('Gender not choose'),
      });
  }
  onSubmit(value){
    let data = {
      age: value.age,
      name: value.name,
      gender:value.gender,
    }
    this.showLoading("Processing");
    this.firebaseService.addFirstBabyService(data)
    .then(
      res => {
        this.router.navigate(['/tabs']);
      }
    )
    .catch(err=>{
      reject(err)
    })
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

}
