import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLogComponent } from './teacher-log.component';

describe('TeacherLogComponent', () => {
  let component: TeacherLogComponent;
  let fixture: ComponentFixture<TeacherLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherLogComponent]
    });
    fixture = TestBed.createComponent(TeacherLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
