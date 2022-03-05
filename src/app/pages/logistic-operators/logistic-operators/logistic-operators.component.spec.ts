import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticOperatorsComponent } from './logistic-operators.component';

describe('LogisticOperatorsComponent', () => {
  let component: LogisticOperatorsComponent;
  let fixture: ComponentFixture<LogisticOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
