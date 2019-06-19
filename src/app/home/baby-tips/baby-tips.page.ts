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
  public loadedBabyTips:any[];
  constructor(
    private loadingCtrl:LoadingController,
    private firebaseService:BabyTipsServiceService
  ) { }

  ngOnInit() {
    this.firebaseService.getBabyTips().then(data=>{
      this.showLoading("Loading....")
      .then(()=>{
        this.babyTips=data;
        this.loadedBabyTips=data;
        this.loadingCtrl.dismiss();
      })
    });  
  }
  initializeBabyTips():void{
    this.babyTips=this.loadedBabyTips;//debug , hack
  }
  filterBabyTips(event){
    this.initializeBabyTips();
    const searchTerm=event.srcElement.value;

    if(!searchTerm){
      return; //return nothing if it is empty
    }
    this.babyTips=this.loadedBabyTips.filter(currentBabyTips=>{
      if(currentBabyTips.payload.doc.data().title && searchTerm){
        if(currentBabyTips.payload.doc.data().title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
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
