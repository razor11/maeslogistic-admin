import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoLayoutComponent } from './lo-layout.component';

describe('LoLayoutComponent', () => {
  let component: LoLayoutComponent;
  let fixture: ComponentFixture<LoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
