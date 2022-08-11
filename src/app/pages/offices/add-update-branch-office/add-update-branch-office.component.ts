import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { first } from 'rxjs/operators';
import { BranchOfficesService } from './../../../core/services/branch-offices/branch-offices.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { Offices } from 'src/app/models/offices';

@Component({
  selector: 'app-add-update-branch-office',
  templateUrl: './add-update-branch-office.component.html',
  styleUrls: ['./add-update-branch-office.component.css'],
})
export class AddUpdateBranchOfficeComponent implements OnInit, AfterViewInit {
  branchOfficeForm: FormGroup;
  isAddMode: boolean = true;
  title: string = '';
  branchOffice: Offices[];
  id: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUpdateBranchOfficeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private branchOfficeService: BranchOfficesService,
    public snackBar: SnackbarService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  createForm(): void {
    this.data
      ? ((this.isAddMode = false), (this.title = 'Update'))
      : ((this.isAddMode = true), (this.title = 'Add'));

    this.branchOfficeForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(5)]],
      Country: ['', [Validators.required]],
      State: ['', [Validators.required]],
      ZipCode: ['', [Validators.required, Validators.minLength(5)]],
      City: ['', [Validators.required]],
      Street: ['', Validators.required],
      Suite: ['', Validators.required],
      Latitude: ['', Validators.required],
      Longitude: ['', Validators.required],
      ContactName: ['', Validators.required],
      ContactNumber: ['', Validators.required, Validators.pattern('^[0-9]*$')],
    });

    if (!this.isAddMode) {
      this.branchOfficeForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.branchOfficeForm.invalid) {
      return;
    }

    this.isAddMode ? this.addBranchOffice() : this.updateBranchOffice();
  }

  addBranchOffice() {
    this.branchOfficeService
      .addBranchOffice(this.branchOfficeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'The office was added successfully',
            'dismiss'
          );
        },
        error: (e) => console.log(e),
        complete: () => this.dialogRef.close(),
      });
  }

  updateBranchOffice() {
    this.branchOfficeService
      .updateBranchOffice(this.data.id, this.branchOfficeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'The office was updated successfully',
            'dismiss'
          );
        },
        error: (e) => console.log(e),
        complete: () => this.dialogRef.close(),
      });
  }
}
