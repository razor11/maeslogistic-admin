import { first } from 'rxjs/operators';
import { PackagesTypes } from './../../../../../models/packages-types';
import { PackagesTypesService } from './../../../../../core/services/packages-types/packages-types.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Packages } from 'src/app/models/packages';
import { Parameters } from 'src/app/models/parameters';
import { PackageCatalogService } from 'src/app/core/services/package-catalog/package-catalog.service';

@Component({
  selector: 'app-add-update-package',
  templateUrl: './add-update-package.component.html',
  styleUrls: ['./add-update-package.component.css'],
})
export class AddUpdatePackageComponent implements OnInit {
  packageForm: FormGroup;
  isAddMode: boolean = true;
  title: string = '';
  package: Packages[];
  packageTypes: Parameters[];
  id: any;

  formErrors = {
    description: '',
    weigth: '',
    packageType: {
      id: '',
    },
    price: 0,
    large: 0,
    heigth: 0,
    width: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<AddUpdatePackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private packageCatalogService: PackageCatalogService,
    private packageTypeService: PackagesTypesService
  ) {
    this.packageTypeService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (data) => (this.packageTypes = data),
        error: (e) => console.log(e),
      });
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.data
      ? ((this.isAddMode = false), (this.title = 'Update'))
      : ((this.isAddMode = true), (this.title = 'Add'));

    this.packageForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(2)]],
      weigth: [
        '',
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.minLength(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      packageType: this.fb.group({
        id: ['', Validators.required],
      }),
      price: ['', [Validators.required, Validators.minLength(2)]],
      large: ['', [Validators.required, Validators.minLength(1)]],
      heigth: ['', [Validators.required, Validators.minLength(1)]],
      width: ['', [Validators.required, Validators.minLength(2)]],
    });

    if (!this.isAddMode) {
      this.packageForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.packageForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addPackage();
    } else {
      this.updatePackage();
    }
  }

  addPackage() {
    this.packageCatalogService
      .addNew(this.packageForm.value)
      .pipe(first())
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  updatePackage() {
    this.packageCatalogService
      .update(this.data.id, this.packageForm.value)
      .pipe(first())
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
