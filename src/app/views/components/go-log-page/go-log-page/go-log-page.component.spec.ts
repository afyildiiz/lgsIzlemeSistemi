import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLogPageComponent } from './go-log-page.component';

describe('GoLogPageComponent', () => {
  let component: GoLogPageComponent;
  let fixture: ComponentFixture<GoLogPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoLogPageComponent]
    });
    fixture = TestBed.createComponent(GoLogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
