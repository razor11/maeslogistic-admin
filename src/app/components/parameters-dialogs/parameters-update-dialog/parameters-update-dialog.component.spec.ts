import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersUpdateDialogComponent } from './parameters-update-dialog.component';

describe('ParametersUpdateDialogComponent', () => {
  let component: ParametersUpdateDialogComponent;
  let fixture: ComponentFixture<ParametersUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametersUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
