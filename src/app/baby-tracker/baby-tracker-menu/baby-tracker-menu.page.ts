import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-baby-tracker-menu',
  templateUrl: './baby-tracker-menu.page.html',
  styleUrls: ['./baby-tracker-menu.page.scss'],
})
export class BabyTrackerMenuPage implements OnInit {
  public babyList:Array<any>=[];
  constructor(
    private storage:Storage,
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
