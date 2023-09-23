import { TestBed } from '@angular/core/testing';

import { LessonCategoryService } from './lesson-category.service';

describe('LessonCategoryService', () => {
  let service: LessonCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
