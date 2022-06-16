import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmAddComponent } from './em-add.component';

describe('EmAddComponent', () => {
  let component: EmAddComponent;
  let fixture: ComponentFixture<EmAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
