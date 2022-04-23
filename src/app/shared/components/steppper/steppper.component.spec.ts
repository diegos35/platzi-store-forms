import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteppperComponent } from './steppper.component';

describe('SteppperComponent', () => {
  let component: SteppperComponent;
  let fixture: ComponentFixture<SteppperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteppperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteppperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
