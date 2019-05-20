import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit {

  constructor(private storage: Storage, private router: Router) {}

  ngOnInit() {
  }
  async finishLesson() {
    await this.storage.set('lessonComplete', true);//set value to true when hit submit
    this.router.navigate(['/login']);
  }

}
