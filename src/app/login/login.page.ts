import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading:any;
  errorMessage: string = '';
  login: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public fAuthService: AuthenticationService,
    public toastCtrl:ToastController,
    private router:Router
  ) { }

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  emailLogin(userValue){
    this.showLoading("Authenticating");
    this.fAuthService.emailLogin(userValue)
    .then(res =>{
      setTimeout(()=>{
        this.router.navigate(['/tabs']);
        this.showToast("Welcome Back"); 
        this.login.reset();
      },500)
    }, err => this.errorMessage = err.message)
  }

  async showToast(message){
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
      duration: 600
    });
    loading.present();
  }

}
