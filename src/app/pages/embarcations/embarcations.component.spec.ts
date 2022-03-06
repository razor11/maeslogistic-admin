import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarcationsComponent } from './embarcations.component';

describe('EmbarcationsComponent', () => {
  let component: EmbarcationsComponent;
  let fixture: ComponentFixture<EmbarcationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarcationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarcationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
