import { Component, OnInit } from '@angular/core';
import { BabyRecipesServiceService } from '../baby-recipes-service.service';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-baby-recipes-detail',
  templateUrl: './baby-recipes-detail.page.html',
  styleUrls: ['./baby-recipes-detail.page.scss'],
})
export class BabyRecipesDetailPage implements OnInit {
  recipe:any;
  subject="Baby Boss Recipe";
  constructor(
    private firebaseService:BabyRecipesServiceService,
    private route:ActivatedRoute,
    private socialShare:SocialSharing,
  ) { }

  ngOnInit() {
    let recipeId:string = this.route.snapshot.paramMap.get('id');
    this.recipe=this.firebaseService.getBabyRecipesDetail(recipeId).subscribe(data=>{
      this.recipe=data;
    });
  }
  shareContent(){
    this.socialShare.shareViaEmail(JSON.stringify((this.recipe),['title', 'time', 'age', 'ingredients','method'], 1).replace(/[\[\]\{\}]+/g, "").replace(/[\[\]"]+/g, ""),"BabyBoss Recipe",null)
    .then(()=>{
      console.log(" successfully");
    }).catch((error)=>{
      console.log("failed");
    })
  }
  

}
