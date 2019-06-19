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
  errorMessage1:string='';
  login: FormGroup;
  check:boolean;
  reset:boolean=false;
  resetPasswordForm:FormGroup;

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
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }
  ionViewWillEnter(){
    this.reset=false;
    console.log("ionViewEnter");
    this.fAuthService.afAuth.authState.subscribe(user=>{
      if (user){
        if(!user.emailVerified){
          this.check=false;
        }
        else if (user.emailVerified){
          this.router.navigate(['/welcome-add-baby']);
          this.check=true;
          this.showToast("Welcome");
        }
      }
      else{
        this.check=true;
      }
    }) 
    // console.log(currentUser)
    // if(currentUser&&!currentUser.emailVerified){
    //   this.check=false;
    // }
    // else{
    //   this.router.navigate(['/welcome-add-baby']);
    //   this.check=true;
    //   this.showToast("Welcome");
    // }
  }
  emailLogin(userValue){
    this.showLoading("Authenticating");
    this.fAuthService.emailLogin(userValue)
    .then(res =>{
      let currentUser=this.fAuthService.afAuth.auth.currentUser; 
      setTimeout(()=>{
        if(!currentUser.emailVerified){
          this.check=false;
        }
        else{
        this.router.navigate(['/tabs']);
        this.showToast("Welcome Back"); 
        this.login.reset();
        this.errorMessage="";
        }
      },500)
    }, err => this.errorMessage = err.message)
  }
  resetMail()
  {
    this.reset=true;
  }
  resetEmailPassword(userValue)
  {
    this.fAuthService.emailPassWordReset(userValue)
    .then(res =>{
        this.router.navigate(['/login']);
        this.reset=false;
        this.resetPasswordForm.reset();
        this.errorMessage1="";
        this.showToast("Password reset mail sent,please check your mail"); 
      },error => this.errorMessage1 = error.message)
  }
  resendVerification(){
    let currentUser=this.fAuthService.afAuth.auth.currentUser; 
    if(!currentUser.emailVerified){
    currentUser.sendEmailVerification().then(()=>{
      this.showToast("Verification send to your email, please check")
    })
    .catch(()=>{
      this.showToast("Please check your email that you register")
    })
  }
  else{
    this.showToast("Your account has been verified, please click refresh")
  }
  }
  refresh(){
    window.location.reload();
    // let currentUser=this.fAuthService.afAuth.auth.currentUser; 
    // if(currentUser.emailVerified)
    // {
    //   this.router.navigate(['/welcome-add-baby']);
    //   this.showToast("Welcome"+currentUser.email) 
    // }
    // else{
    //   this.showToast("Your account have not verified yet, please verify")
    // }
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
  logout() {
    this.fAuthService.logout()
      .then((res) => {
        this.showToast("Login Form");
      }, (error) => {
        console.log("error", error);
      });
  }

}
