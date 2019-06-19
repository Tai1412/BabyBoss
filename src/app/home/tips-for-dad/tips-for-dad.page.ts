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
  public loadedDadTips:any[];
  constructor(
    private loadingCtrl:LoadingController,
    private firebaseService:TipsForDadServiceService
  ) { }

  ngOnInit() {
    this.firebaseService.getTipsForDad().then(data=>{
      this.showLoading("Loading....")
      .then(()=>{
        this.tipsForDad=data;
        this.loadedDadTips=data;
        this.loadingCtrl.dismiss();
      })
    });
  }
  initializeDadTips():void{
    this.tipsForDad=this.loadedDadTips;//debug , hack
  }
  filterDadTips(event){
    this.initializeDadTips();
    const searchTerm=event.srcElement.value;

    if(!searchTerm){
      return; //return nothing if it is empty
    }
    this.tipsForDad=this.loadedDadTips.filter(currentDadTips=>{
      if(currentDadTips.payload.doc.data().title && searchTerm){
        if(currentDadTips.payload.doc.data().title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
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
