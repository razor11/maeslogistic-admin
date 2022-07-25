import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePackageComponent } from './add-update-package.component';

describe('AddUpdatePackageComponent', () => {
  let component: AddUpdatePackageComponent;
  let fixture: ComponentFixture<AddUpdatePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdatePackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdatePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
