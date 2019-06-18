import { Component, OnInit } from '@angular/core';
import { TipsForDadServiceService } from './tips-for-dad-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tips-for-dad',
  templateUrl: './tips-for-dad.page.html',
  styleUrls: ['./tips-for-dad.page.scss'],
})
export class TipsForDadPage implements OnInit {
  public tipsForDad:Array<any>=[];
  constructor(
    private loadingCtrl:LoadingController,
    private firebaseService:TipsForDadServiceService
  ) { }

  ngOnInit() {
    this.firebaseService.getTipsForDad().then(data=>{
      this.showLoading("Loading....")
      .then(()=>{
        this.tipsForDad=data;
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
