import { Component, OnInit } from '@angular/core';
//import { Validators, FormGroup, FormControl } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile_form:FormGroup;
  errorMessage:string='';
  user: any = {
    id: "",
    name: "",
    email:"",
    };
  validation_messages={
    'name':[
      {type:'required',message:'Name is required.'},
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter the valid email' },
      { type: 'maxlength', message: 'The email only accept 20 characters before @gmail.com' },
      { type: 'pattern', message: 'The email only accept gmail.com and more than 5 characters long' }
    ]
  };
  constructor(
    public afAuthService: AuthenticationService,
    public router:Router,
    public toastCtrl:ToastController
    ) 
    { 
  
    }

  ngOnInit() {
    this.profile_form=new FormGroup({
      name:new FormControl('set your name',Validators.required),
      email: new FormControl('',[ Validators.required,Validators.email,Validators.pattern('^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$'),Validators.maxLength(30)]),
    });
  }
  ionViewWillEnter(){
    this.afAuthService.getCurrentUser()
    .then(user=>{
      this.user=user;
      this.updateUserProfiles(this.user.name,this.user.email);
    },
    err=>console.log(err))
    this.profile_form.reset();
  }
  updateUserProfiles(name,email){
    this.profile_form.patchValue({
      name:name,
      email:email
    });
  }
  saveUserProfiles(value){
    this.afAuthService.updateUserProfiles(value)
    .then(res => {
      this.showToast("Update Successfuly");
    })
    .catch( error => {
      this.errorMessage = error.message
      this.showToast(this.errorMessage)
    })
  }
  logout(){
    this.afAuthService.logout()
    .then((res) => {
      this.router.navigate(['/login']);//log out to previous navigation
      this.showToast("LogOut Successfully");
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  async showToast(message){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}
