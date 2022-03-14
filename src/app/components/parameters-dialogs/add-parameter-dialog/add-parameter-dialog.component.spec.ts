import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParameterDialogComponent } from './add-parameter-dialog.component';

describe('AddParameterDialogComponent', () => {
  let component: AddParameterDialogComponent;
  let fixture: ComponentFixture<AddParameterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParameterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParameterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
