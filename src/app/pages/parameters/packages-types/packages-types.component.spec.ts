import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesTypesComponent } from './packages-types.component';

describe('PackagesTypesComponent', () => {
  let component: PackagesTypesComponent;
  let fixture: ComponentFixture<PackagesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
