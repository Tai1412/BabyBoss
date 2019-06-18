import { Component, OnInit } from '@angular/core';
import { TipsForMomServiceService } from './tips-for-mom-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tips-for-mom',
  templateUrl: './tips-for-mom.page.html',
  styleUrls: ['./tips-for-mom.page.scss'],
})
export class TipsForMomPage implements OnInit {
  public tipsForMom:Array<any>=[];
  constructor(
    private loadingCtrl:LoadingController,
    private firebaseService:TipsForMomServiceService
  ) { }

  ngOnInit() {
   
    this.firebaseService.getTipsForMom().then((data)=>{
      this.showLoading("Loading....")
      .then(()=>{
        this.tipsForMom=data;
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
