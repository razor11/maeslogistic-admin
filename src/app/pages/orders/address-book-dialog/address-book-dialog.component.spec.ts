import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBookDialogComponent } from './address-book-dialog.component';

describe('AddressBookDialogComponent', () => {
  let component: AddressBookDialogComponent;
  let fixture: ComponentFixture<AddressBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressBookDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
