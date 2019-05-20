import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class LessonGuard implements CanActivate  {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    const completeLesson = await this.storage.get('lessonComplete');

    if (!completeLesson) {
      this.router.navigate(['/lesson']);
    }

    return completeLesson;
  }
  
}
