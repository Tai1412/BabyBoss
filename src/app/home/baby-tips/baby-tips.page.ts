import { Component, OnInit } from '@angular/core';
import { BabyTipsServiceService } from './baby-tips-service.service';

@Component({
  selector: 'app-baby-tips',
  templateUrl: './baby-tips.page.html',
  styleUrls: ['./baby-tips.page.scss'],
})
export class BabyTipsPage implements OnInit {
  public babyTips:Array<any>=[];
  constructor(
    private firebaseService:BabyTipsServiceService
  ) { }

  ngOnInit() {
    this.firebaseService.getBabyTips().then(data=>{
      this.babyTips=data;
    });  
  }

}
