import { Component, OnInit } from '@angular/core';
import { BabyTipsServiceService } from './baby-tips/baby-tips-service.service';
import { TipsForDadServiceService } from './tips-for-dad/tips-for-dad-service.service';
import { TipsForMomServiceService } from './tips-for-mom/tips-for-mom-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  momTipCount: any;
  dadTipCount: any;
  babyTipCount: any;
  constructor(
    private firebaseService:BabyTipsServiceService,
    private firebaseService1:TipsForDadServiceService,
    private firebaseService2:TipsForMomServiceService

  ) {
    this.firebaseService.getBabyTips().then(data=>{
      this.babyTipCount=data;
    });
    this.firebaseService1.getTipsForDad().then(data=>{
      this.dadTipCount=data;
    });
    this.firebaseService2.getTipsForMom().then(data=>{
      this.momTipCount=data;
    });

   }

  ngOnInit() {
  }

}
