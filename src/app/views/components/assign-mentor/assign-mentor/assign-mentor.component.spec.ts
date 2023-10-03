import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMentorComponent } from './assign-mentor.component';

describe('AssignMentorComponent', () => {
  let component: AssignMentorComponent;
  let fixture: ComponentFixture<AssignMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignMentorComponent]
    });
    fixture = TestBed.createComponent(AssignMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
