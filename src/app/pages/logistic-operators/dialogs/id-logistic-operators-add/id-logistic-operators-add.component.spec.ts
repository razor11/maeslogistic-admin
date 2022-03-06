import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdLogisticOperatorsAddComponent } from './id-logistic-operators-add.component';

describe('IdLogisticOperatorsAddComponent', () => {
  let component: IdLogisticOperatorsAddComponent;
  let fixture: ComponentFixture<IdLogisticOperatorsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdLogisticOperatorsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdLogisticOperatorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
