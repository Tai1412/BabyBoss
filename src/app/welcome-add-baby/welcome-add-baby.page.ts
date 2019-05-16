import { Component, OnInit } from '@angular/core';
import { BabyServiceService } from '../services/baby-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-add-baby',
  templateUrl: './welcome-add-baby.page.html',
  styleUrls: ['./welcome-add-baby.page.scss'],
})
export class WelcomeAddBabyPage implements OnInit {

  constructor(
    public router:Router,
  ) { }

  ngOnInit() {
  }
  addFirstBaby(){
    this.router.navigate(['/add-first-baby-form']); 
  }

}
