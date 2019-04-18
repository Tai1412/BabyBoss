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
    this.fAuthService.emailLogin(userValue)
    .then(res =>{
      this.router.navigate(['/tabs']);  
      this.login.reset();
    }, err => this.errorMessage = err.message)
  }

}
