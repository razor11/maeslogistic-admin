import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCatalogComponent } from './package-catalog.component';

describe('PackageCatalogComponent', () => {
  let component: PackageCatalogComponent;
  let fixture: ComponentFixture<PackageCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
