import { TestBed, async, inject } from '@angular/core/testing';

import { LessonGuard } from './lesson.guard';

describe('LessonGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonGuard]
    });
  });

  it('should ...', inject([LessonGuard], (guard: LessonGuard) => {
    expect(guard).toBeTruthy();
  }));
});
