import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogByTeacherComponent } from './log-by-teacher.component';

describe('LogByTeacherComponent', () => {
  let component: LogByTeacherComponent;
  let fixture: ComponentFixture<LogByTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogByTeacherComponent]
    });
    fixture = TestBed.createComponent(LogByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
