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
  public loadedBabyRecipe:any[];
  constructor(
    private firebaseService:BabyRecipesServiceService
  ) { }

  ngOnInit() {
    this.firebaseService.getBabyRecipes().then(data=>{
     setTimeout(()=>{
       this.isLoaded=true;
       this.babyRecipes=data;
       this.loadedBabyRecipe=data;
     },4000)
    })
  }
  initializeBabyRecipe():void{
    this.babyRecipes=this.loadedBabyRecipe;//debug , hack
  }

  filterBabyRecipe(event){
    this.initializeBabyRecipe();
    const searchTerm=event.srcElement.value;

    if(!searchTerm){
      return; //return nothing if it is empty
    }
    this.babyRecipes=this.loadedBabyRecipe.filter(currentRecipe=>{
      if(currentRecipe.payload.doc.data().title && searchTerm){
        if(currentRecipe.payload.doc.data().title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }
}
