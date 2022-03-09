import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersLayoutComponent } from './parameters-layout.component';

describe('ParametersLayoutComponent', () => {
  let component: ParametersLayoutComponent;
  let fixture: ComponentFixture<ParametersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametersLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
