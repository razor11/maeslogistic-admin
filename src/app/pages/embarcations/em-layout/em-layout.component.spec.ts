import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmLayoutComponent } from './em-layout.component';

describe('EmLayoutComponent', () => {
  let component: EmLayoutComponent;
  let fixture: ComponentFixture<EmLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
