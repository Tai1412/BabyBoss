import { Component, OnInit } from '@angular/core';
import { TermsandconditionService } from 'src/app/services/termsandcondition.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.page.html',
  styleUrls: ['./terms-and-condition.page.scss'],
})
export class TermsAndConditionPage implements OnInit {
  public termsAndConditions=[];

  constructor(private TACService:TermsandconditionService) { }//TAC mean Terms And Condition

  ngOnInit() {
    this.TACService.getTermsAndCondition()
    .subscribe(data=>this.termsAndConditions=data)
  }

}
