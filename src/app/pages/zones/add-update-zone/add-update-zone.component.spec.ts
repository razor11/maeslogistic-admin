import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateZoneComponent } from './add-update-zone.component';

describe('AddUpdateZoneComponent', () => {
  let component: AddUpdateZoneComponent;
  let fixture: ComponentFixture<AddUpdateZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
