import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBranchOfficeComponent } from './add-update-branch-office.component';

describe('AddUpdateBranchOfficeComponent', () => {
  let component: AddUpdateBranchOfficeComponent;
  let fixture: ComponentFixture<AddUpdateBranchOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateBranchOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateBranchOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
