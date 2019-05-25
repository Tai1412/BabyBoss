import { Component, OnInit } from '@angular/core';
import { BabyServiceService } from '../services/baby-service.service';
import { ActivatedRoute } from '@angular/router';
import {BabyDetailPage} from '../profile/baby-detail/baby-detail.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-baby-tracker',
  templateUrl: './baby-tracker.page.html',
  styleUrls: ['./baby-tracker.page.scss'],
})
export class BabyTrackerPage implements OnInit {
  public babyList:Array<any>=[];
  constructor(
    private firebaseService:BabyServiceService,
    private route:ActivatedRoute,
    private storage:Storage
  ) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.storage.get('babyDetail').then(val =>{
        this.babyList=val
        console.log(this.babyList)
    })
    
  }
  

}
