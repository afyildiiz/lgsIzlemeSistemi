import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelFormComponent } from './excel-form.component';

describe('ExcelFormComponent', () => {
  let component: ExcelFormComponent;
  let fixture: ComponentFixture<ExcelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelFormComponent]
    });
    fixture = TestBed.createComponent(ExcelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
