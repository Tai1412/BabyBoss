import { Component, OnInit } from '@angular/core';
import { BabyTipsServiceService } from './baby-tips-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-baby-tips',
  templateUrl: './baby-tips.page.html',
  styleUrls: ['./baby-tips.page.scss'],
})
export class BabyTipsPage implements OnInit {
  public babyTips:Array<any>=[];
  constructor(
    private loadingCtrl:LoadingController,
    private firebaseService:BabyTipsServiceService
  ) { }

  ngOnInit() {
    this.firebaseService.getBabyTips().then(data=>{
      this.showLoading("Loading....")
      .then(()=>{
        this.babyTips=data;
        this.loadingCtrl.dismiss();
      })
    });  
  }
  async showLoading(message){
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner:'dots',
    });
    loading.present();
  }
}
