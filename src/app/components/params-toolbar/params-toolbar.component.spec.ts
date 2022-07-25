import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsToolbarComponent } from './params-toolbar.component';

describe('ParamsToolbarComponent', () => {
  let component: ParamsToolbarComponent;
  let fixture: ComponentFixture<ParamsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
