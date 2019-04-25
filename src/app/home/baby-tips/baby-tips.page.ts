import { Component, OnInit } from '@angular/core';
import { BabyTipsServiceService } from './baby-tips-service.service';

@Component({
  selector: 'app-baby-tips',
  templateUrl: './baby-tips.page.html',
  styleUrls: ['./baby-tips.page.scss'],
})
export class BabyTipsPage implements OnInit {
  public babyTips;
  constructor(
    private firebaseService:BabyTipsServiceService
  ) { }

  ngOnInit() {
    this.babyTips=this.firebaseService.getBabyTips();
  }

}
