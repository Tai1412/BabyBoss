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
  public loadedMomTips:any[];
  constructor(
    private loadingCtrl:LoadingController,
    private firebaseService:TipsForMomServiceService
  ) { }

  ngOnInit() {
   
    this.firebaseService.getTipsForMom().then((data)=>{
      this.showLoading("Loading....")
      .then(()=>{
        this.tipsForMom=data;
        this.loadedMomTips=data;
        this.loadingCtrl.dismiss();
      })
    });
   
  }
  initializeMomTips():void{
    this.tipsForMom=this.loadedMomTips;//debug , hack
  }
  filterMomTips(event){
    this.initializeMomTips();
    const searchTerm=event.srcElement.value;

    if(!searchTerm){
      return; //return nothing if it is empty
    }
    this.tipsForMom=this.loadedMomTips.filter(currentMomTips=>{
      if(currentMomTips.payload.doc.data().title && searchTerm){
        if(currentMomTips.payload.doc.data().title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
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
