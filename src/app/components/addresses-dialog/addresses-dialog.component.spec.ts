import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesDialogComponent } from './addresses-dialog.component';

describe('AddressesDialogComponent', () => {
  let component: AddressesDialogComponent;
  let fixture: ComponentFixture<AddressesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
