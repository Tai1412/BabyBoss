import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TipsForMomServiceService } from '../tips-for-mom-service.service';

@Component({
  selector: 'app-tips-for-mom-detail',
  templateUrl: './tips-for-mom-detail.page.html',
  styleUrls: ['./tips-for-mom-detail.page.scss'],
})
export class TipsForMomDetailPage implements OnInit {
  tip: any;

  constructor(
    private firebaseService:TipsForMomServiceService,
    private route:ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    let tipId:string = this.route.snapshot.paramMap.get('id');
    this.tip=this.firebaseService.getTipsForMomDetail(tipId).subscribe(data=>{
      this.tip=data;
    });
  }

}
