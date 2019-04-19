import { Component, OnInit } from '@angular/core';
//import { Validators, FormGroup, FormControl } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile_form:FormGroup;
  user: any = {
    id: "",
    name: "",
    };
  validation_messages={
    'name':[
      {type:'required',message:'Name is required.'},
    ]
  };
  constructor(
    public afAuthService: AuthenticationService,
    public router:Router
    ) 
    { 
  
    }

  ngOnInit() {
    this.profile_form=new FormGroup({
      name:new FormControl('',Validators.required)
    });
  }
  ionViewWillEnter(){
    this.afAuthService.getCurrentUser()
    .then(user=>{
      this.user=user;
      this.updateUserProfiles(this.user.name);
    },
    err=>console.log(err))
  }
  updateUserProfiles(name){
    this.profile_form.patchValue({
      name:name,
    });
  }
  saveUserProfiles(value){
    this.afAuthService.updateUserProfiles(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }
  logout(){
    this.afAuthService.logout()
    .then((res) => {
      this.router.navigate(['/login']);//log out to previous navigation
    }, (error) => {
      console.log("Logout error", error);
    });
  }


}
