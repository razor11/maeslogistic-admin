import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarcationsFormComponent } from './embarcations-form.component';

describe('EmbarcationsFormComponent', () => {
  let component: EmbarcationsFormComponent;
  let fixture: ComponentFixture<EmbarcationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarcationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarcationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
