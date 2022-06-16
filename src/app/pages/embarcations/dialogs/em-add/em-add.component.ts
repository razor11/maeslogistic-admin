import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { TrackingStatusService } from 'src/app/core/services/tracking-status/tracking-status.service';
import { first } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { embarcation } from 'src/app/models/embarcation';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { EmbarcationsService } from 'src/app/core/services/embarcations/embarcations.service';
import { LogisticOperatorsService } from 'src/app/core/services/logistic-operators/logistic-operators.service';
import { forkJoin } from 'rxjs';
import { Parameters } from 'src/app/models/parameters';

@Component({
  selector: 'app-em-add',
  templateUrl: './em-add.component.html',
  styleUrls: ['./em-add.component.css'],
})
export class EmAddComponent implements OnInit {
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
    private loService: LogisticOperatorsService,
    private trackingTypesService: TrackingStatusService,
    private snackService: SnackbarService
  ) {
      const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }





  ngOnInit(): void {



    this.loadParams();

    this.form = this.fb.group({
      EstimatedDepartureDate: new FormControl,
      EstimatedArrivingDate:  new FormControl,
      VeselNumber: ['', Validators.required],
      LogisticOperator: this.fb.group({
        id: ['', Validators.required]
      }),
      WeigthCapacity: ['', Validators.required],
      volumeCapacity:['', Validators.required],
      tracking: this.fb.group({
        id:['', Validators.required]
      })


    });
  }


  loadParams(){

    const LogisticOperators = this.loService.getAll(1,50);
    const TrackingTypes = this.trackingTypesService.getAll();

    forkJoin([LogisticOperators,TrackingTypes])
       .pipe(first())
       .subscribe((data) => {
         this.lo = data[0];
         this.trackingTypes = data[1];
         console.log(this.trackingTypes)
       })


  }

  getLogisticOperators() {
    this.loService
      .getAll(1, 50)
      .pipe(first())
      .subscribe((data) => {
        this.lo = data;
        console.log(this.lo)
      });
  }

  createEmbarcation() {
    this.emService
      .addEmbarcation(this.form.value)
      .pipe(first())
      .subscribe((data) => {
        let actionText = 'Dismiss';
        if(data.status >= 202){
          this.error = data.error;
          this.snackService.openSnackBar(this.error, actionText);
        }
        else{
          this.snackService.openSnackBar('New embarcation created', actionText)
          this.dialogRef.close();
        }

      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      this.createEmbarcation();
    }
  }
}
