import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsDataTableComponent } from './params-data-table.component';

describe('ParamsDataTableComponent', () => {
  let component: ParamsDataTableComponent;
  let fixture: ComponentFixture<ParamsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
