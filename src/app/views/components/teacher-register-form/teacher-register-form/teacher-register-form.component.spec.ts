import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRegisterFormComponent } from './teacher-register-form.component';

describe('TeacherRegisterFormComponent', () => {
  let component: TeacherRegisterFormComponent;
  let fixture: ComponentFixture<TeacherRegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherRegisterFormComponent]
    });
    fixture = TestBed.createComponent(TeacherRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
