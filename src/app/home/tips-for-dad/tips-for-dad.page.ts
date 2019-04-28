import { Component, OnInit } from '@angular/core';
import { TipsForDadServiceService } from './tips-for-dad-service.service';

@Component({
  selector: 'app-tips-for-dad',
  templateUrl: './tips-for-dad.page.html',
  styleUrls: ['./tips-for-dad.page.scss'],
})
export class TipsForDadPage implements OnInit {
  public tipsForDad:Array<any>=[];
  constructor(
    private firebaseService:TipsForDadServiceService
  ) { }

  ngOnInit() {
    this.firebaseService.getTipsForDad().then(data=>{
      this.tipsForDad=data;
    });
  }

}
