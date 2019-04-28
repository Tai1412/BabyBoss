import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BabyTipsServiceService } from '../baby-tips-service.service';

@Component({
  selector: 'app-baby-tips-detail',
  templateUrl: './baby-tips-detail.page.html',
  styleUrls: ['./baby-tips-detail.page.scss'],
})
export class BabyTipsDetailPage implements OnInit {
  tip:any;
  constructor(
    private firebaseService:BabyTipsServiceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    let tipId:string=this.route.snapshot.paramMap.get('id');
    this.tip=this.firebaseService.getBabyTipsDetail(tipId).subscribe(data=>{
      this.tip=data;
    })
  }

}
