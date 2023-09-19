import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTopBarComponent } from './register-top-bar.component';

describe('RegisterTopBarComponent', () => {
  let component: RegisterTopBarComponent;
  let fixture: ComponentFixture<RegisterTopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTopBarComponent]
    });
    fixture = TestBed.createComponent(RegisterTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
