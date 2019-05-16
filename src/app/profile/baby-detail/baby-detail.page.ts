import { Component, OnInit } from '@angular/core';
import { BabyServiceService } from 'src/app/services/baby-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-baby-detail',
  templateUrl: './baby-detail.page.html',
  styleUrls: ['./baby-detail.page.scss'],
})
export class BabyDetailPage implements OnInit {
  public babyId:string=this.route.snapshot.paramMap.get('id');
  updateBabyForm:FormGroup
  baby:any;
  constructor(
    private firebaseService:BabyServiceService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    public router:Router,

  ) {
    this.baby=this.firebaseService.getBabyDetail(this.babyId).subscribe(data=>{
      this.baby=data;
      console.log(this.baby)
    })
    this.updateBabyForm = this.formBuilder.group({
      age: new FormControl(this.baby.age),
      name: new FormControl(this.baby.name),
      gender: new FormControl(this.baby.gender),
      });
   }

  ngOnInit() {
    
  }
  updateBabySubmit(value){
    let data = {
      age: value.age,
      name: value.name,
      gender:value.gender,
    }
    this.firebaseService.updateBabyDetailService(this.babyId,data)
    .then(
      res => {
        this.router.navigate(['/tabs/profile']);
      }
    )
  }
  deleteBaby(){
    this.firebaseService.deleteBabyService(this.babyId)
    .then(res=>{
      this.router.navigate(['/tabs/profile']);
    })
  }
}
