import { Component, OnInit } from '@angular/core';
import { TipsForMomServiceService } from './tips-for-mom-service.service';

@Component({
  selector: 'app-tips-for-mom',
  templateUrl: './tips-for-mom.page.html',
  styleUrls: ['./tips-for-mom.page.scss'],
})
export class TipsForMomPage implements OnInit {
  public tipsForMom;
  constructor(
    private firebaseService:TipsForMomServiceService
  ) { }

  ngOnInit() {
    this.tipsForMom=this.firebaseService.getTipsForMom();
  }

}
