import { first } from 'rxjs/operators';
import { SnackbarService } from './../../../core/services/snackbar/snackbar.service';
import { ZonesService } from 'src/app/core/services/zones/zones.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Zones } from 'src/app/models/zones';

@Component({
  selector: 'app-add-update-zone',
  templateUrl: './add-update-zone.component.html',
  styleUrls: ['./add-update-zone.component.css'],
})
export class AddUpdateZoneComponent implements OnInit, AfterViewInit {
  zonesForm: FormGroup;
  isAddMode: boolean = true;
  title: string = '';
  zone: Zones[];

  id: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUpdateZoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private zonesService: ZonesService,
    public snackBar: SnackbarService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  buildForm(): void {
    this.data
      ? ((this.isAddMode = false), (this.title = 'Update'))
      : ((this.isAddMode = true), (this.title = 'Add'));

    this.zonesForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      minDistance: [0, [Validators.required, Validators.minLength(2)]],
      maxDistance: [0, [Validators.required, Validators.minLength(2)]],
      fee: [0, [Validators.required, Validators.minLength(2)]],
    });

    if (!this.isAddMode) {
      this.zonesForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.zonesForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createZone();
    } else {
      this.updateZone();
    }
  }

  createZone() {
    this.zonesService
      .addZone(this.zonesForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'The zone ewas created successfully',
            'dismiss'
          );
        },
        error: (e) => this.snackBar.openSnackBar(e, 'dismiss'),
        complete: () => this.dialogRef.close(),
      });
  }

  updateZone() {
    this.zonesService
      .update(this.data.id, this.zonesForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'The zone was updated successfully',
            'dismiss'
          );
        },
        error: (e) => this.snackBar.openSnackBar(e, 'dismiss'),
        complete: () => this.dialogRef.close(),
      });
  }
}
