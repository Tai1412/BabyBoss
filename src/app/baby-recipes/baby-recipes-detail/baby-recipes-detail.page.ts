import { Component, OnInit } from '@angular/core';
import { BabyRecipesServiceService } from '../baby-recipes-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-baby-recipes-detail',
  templateUrl: './baby-recipes-detail.page.html',
  styleUrls: ['./baby-recipes-detail.page.scss'],
})
export class BabyRecipesDetailPage implements OnInit {
  recipe:any;
  constructor(
    private firebaseService:BabyRecipesServiceService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    let recipeId:string = this.route.snapshot.paramMap.get('id');
    this.recipe=this.firebaseService.getBabyRecipesDetail(recipeId).subscribe(data=>{
      this.recipe=data;
    });
  }

}
