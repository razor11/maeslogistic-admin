import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Packages } from 'src/app/models/packages';
import { PackageCatalogService } from 'src/app/core/services/package-catalog/package-catalog.service';

@Component({
  selector: 'app-add-update-package',
  templateUrl: './add-update-package.component.html',
  styleUrls: ['./add-update-package.component.css'],
})
export class AddUpdatePackageComponent implements OnInit {
  form: FormGroup;
  isAddMode: boolean = true;
  title: string = 'Add';
  package: Packages[];

  formErrors = {
    description: '',
    weigth: '',
    weigthUnits: '',
    volumen: 0,
    units: '',
    large: 0,
    heigth: 0,
    width: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<AddUpdatePackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private packageCatalogService: PackageCatalogService
  ) {}

  ngOnInit(): void {}

  createForm(): void {
    this.form = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(2)]],

    })
  }
}
