import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsCategoriesComponent } from './lessons-categories.component';

describe('LessonsCategoriesComponent', () => {
  let component: LessonsCategoriesComponent;
  let fixture: ComponentFixture<LessonsCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonsCategoriesComponent]
    });
    fixture = TestBed.createComponent(LessonsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
