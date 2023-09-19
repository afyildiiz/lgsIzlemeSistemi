import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisterFormComponent } from './student-register-form.component';

describe('StudentRegisterFormComponent', () => {
  let component: StudentRegisterFormComponent;
  let fixture: ComponentFixture<StudentRegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRegisterFormComponent]
    });
    fixture = TestBed.createComponent(StudentRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
