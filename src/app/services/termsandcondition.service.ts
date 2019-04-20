import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ITermsAndCondition} from '../profile/terms-and-condition/terms-and-condition.model';//terms and condtion.ts
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TermsandconditionService {
  private url:string="/assets/data/termsandcondition.json";
  constructor(private http:HttpClient) { }
  
  getTermsAndCondition():Observable<ITermsAndCondition[]>{
    return this.http.get<ITermsAndCondition[]>(this.url);
  }
}
