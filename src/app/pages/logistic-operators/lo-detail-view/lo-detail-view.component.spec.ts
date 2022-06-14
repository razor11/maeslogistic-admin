import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoDetailViewComponent } from './lo-detail-view.component';

describe('LoDetailViewComponent', () => {
  let component: LoDetailViewComponent;
  let fixture: ComponentFixture<LoDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
