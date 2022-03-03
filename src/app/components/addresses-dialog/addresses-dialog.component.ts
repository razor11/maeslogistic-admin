import { DataAddressesService } from './../../core/services/addresses/data-addresses.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Addresses } from 'src/app/models/addresses';
import { first } from 'rxjs';

@Component({
  selector: 'app-addresses-dialog',
  templateUrl: './addresses-dialog.component.html',
  styleUrls: ['./addresses-dialog.component.css'],
})
export class AddressesDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddressesDialogComponent>,
    @Inject(MAT_DIALOG_DATA)() public data: Addresses,
    private fb: FormBuilder,
    private addrService: DataAddressesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      contactName: ['', Validators.required],
      phoneNumber1: ['', Validators.required],
      phoneNumber2: ['', Validators.required],
      email: ['', Validators.email],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required, Validators.max(5)],
      country: ['', Validators.required],
      addressType: new FormGroup({
        description: new FormControl('')
      }),
    });

    this.form.patchValue(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.addrService
        .updateAddr(this.data.id, this.form.value)
        .pipe(first())
        .subscribe(() => {
          this.dialogRef.close();
        });
    } else {
      return;
    }
  }


}
