import { first } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Parameters } from 'src/app/models/parameters';
import { AddressTypesService } from 'src/app/core/services/address-types/address-types.service';

@Component({
  selector: 'app-parameters-update-dialog',
  templateUrl: './parameters-update-dialog.component.html',
  styleUrls: ['./parameters-update-dialog.component.css'],
})
export class ParametersUpdateDialogComponent implements OnInit {
  title: string;
  message: string;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ParametersUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private addrTypeService: AddressTypesService
  ) {}

  ngOnInit(): void {
    this.title = this.data.dialogBodyText.title;
    this.message = this.data.dialogBodyText.message;
    this.form = this.fb.group({
      description: ['', Validators.required],
    });
    this.form.patchValue(this.data.param);
  }


  onDismiss(): void {
    this.dialogRef.close();
  }
}
export class updateDialogModel {
  constructor(public title: string, public message: string) {}
}
