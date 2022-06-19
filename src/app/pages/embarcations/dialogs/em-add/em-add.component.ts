import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { first } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { embarcation } from 'src/app/models/embarcation';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { EmbarcationsService } from 'src/app/core/services/embarcations/embarcations.service';
import { Parameters } from 'src/app/models/parameters';

@Component({
  selector: 'app-em-add',
  templateUrl: './em-add.component.html',
  styleUrls: ['./em-add.component.css'],
})
export class EmAddComponent implements OnInit {
  createForm: FormGroup;
  form: FormGroup;
  embarcation: embarcation;
  lo: any[];
  trackingTypes: Parameters[];
  selectedTrackingStatus: string = 'Pending';
  error: string = '';

  minDate: Date;
  maxDate: Date;

  constructor(
    public dialogRef: MatDialogRef<EmAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private emService: EmbarcationsService,
    private snackService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      embarcation: [],
    });
  }

  createEmbarcation() {
    this.emService
      .addEmbarcation(this.createForm.controls['embarcation'].value)
      .pipe(first())
      .subscribe((data) => {
        let actionText = 'Dismiss';
        if (data.status >= 202) {
          this.error = data.error;
          this.snackService.openSnackBar(this.error, actionText);
        } else {
          console.log(data)
          this.snackService.openSnackBar('New embarcation created', actionText);
          this.dialogRef.close(data.id);
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    } else {
      this.createEmbarcation();
    }
  }
}
