import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLogPageComponent } from './get-log-page.component';

describe('GetLogPageComponent', () => {
  let component: GetLogPageComponent;
  let fixture: ComponentFixture<GetLogPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetLogPageComponent]
    });
    fixture = TestBed.createComponent(GetLogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
