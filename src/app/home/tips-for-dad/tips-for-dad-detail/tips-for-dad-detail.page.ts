import { Component, OnInit } from '@angular/core';
import { TipsForDadServiceService } from '../tips-for-dad-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TipsForDadModel } from '../tips-for-dad-model';

@Component({
  selector: 'app-tips-for-dad-detail',
  templateUrl: './tips-for-dad-detail.page.html',
  styleUrls: ['./tips-for-dad-detail.page.scss'],
})
export class TipsForDadDetailPage implements OnInit {
  public tips:Observable<TipsForDadModel>;
  constructor(
    private firebaseService:TipsForDadServiceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    const tipId:string=this.route.snapshot.paramMap.get('id');
    this.tips=this.firebaseService.getTipsForDadDetail(tipId).valueChanges();

  }

}
