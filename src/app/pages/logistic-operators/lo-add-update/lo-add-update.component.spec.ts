import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoAddUpdateComponent } from './lo-add-update.component';

describe('LoAddUpdateComponent', () => {
  let component: LoAddUpdateComponent;
  let fixture: ComponentFixture<LoAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoAddUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
