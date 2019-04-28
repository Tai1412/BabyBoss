import { Component, OnInit } from '@angular/core';
import { TipsForDadServiceService } from '../tips-for-dad-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tips-for-dad-detail',
  templateUrl: './tips-for-dad-detail.page.html',
  styleUrls: ['./tips-for-dad-detail.page.scss'],
})
export class TipsForDadDetailPage implements OnInit {
  tip:any;
  constructor(
    private firebaseService:TipsForDadServiceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    const tipId:string=this.route.snapshot.paramMap.get('id');
    this.tip=this.firebaseService.getTipsForDadDetail(tipId).subscribe(data=>{
      this.tip=data;
    });

  }

}
