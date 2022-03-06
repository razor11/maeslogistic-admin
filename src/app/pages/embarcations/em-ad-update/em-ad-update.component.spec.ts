import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmAdUpdateComponent } from './em-ad-update.component';

describe('EmAdUpdateComponent', () => {
  let component: EmAdUpdateComponent;
  let fixture: ComponentFixture<EmAdUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmAdUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmAdUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
