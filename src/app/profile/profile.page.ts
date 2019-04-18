import { Component, OnInit } from '@angular/core';
//import { Validators, FormGroup, FormControl } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public afAuthService: AuthenticationService,
    public router:Router) { }

  ngOnInit() {
    
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
