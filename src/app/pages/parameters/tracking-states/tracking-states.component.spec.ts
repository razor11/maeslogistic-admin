import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingStatesComponent } from './tracking-states.component';

describe('TrackingStatesComponent', () => {
  let component: TrackingStatesComponent;
  let fixture: ComponentFixture<TrackingStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
