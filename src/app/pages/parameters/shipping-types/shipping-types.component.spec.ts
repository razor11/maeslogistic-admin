import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingTypesComponent } from './shipping-types.component';

describe('ShippingTypesComponent', () => {
  let component: ShippingTypesComponent;
  let fixture: ComponentFixture<ShippingTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
