import { Component, OnInit } from '@angular/core';
import { BabyRecipesServiceService } from './baby-recipes-service.service';

@Component({
  selector: 'app-baby-recipes',
  templateUrl: './baby-recipes.page.html',
  styleUrls: ['./baby-recipes.page.scss'],
})
export class BabyRecipesPage implements OnInit {
  public babyRecipes:Array<any>=[];
  public isLoaded=false;
  constructor(
    private firebaseService:BabyRecipesServiceService
  ) { }

  ngOnInit() {
    this.firebaseService.getBabyRecipes().then(data=>{
     setTimeout(()=>{
       this.isLoaded=true;
       this.babyRecipes=data;
     },4000)
    })
  }

}
