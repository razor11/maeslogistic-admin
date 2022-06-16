import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { EmbarcationsService } from 'src/app/core/services/embarcations/embarcations.service';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { embarcation } from 'src/app/models/embarcation';

@Component({
  selector: 'app-em-ad-update',
  templateUrl: './em-ad-update.component.html',
  styleUrls: ['./em-ad-update.component.css'],
})
export class EmAdUpdateComponent implements OnInit {
  form: FormGroup;
  error = '';
  embarcation: embarcation;
  id: string;
  submited = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private embarcationService: EmbarcationsService,
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    public dialog: MatDialog,

  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

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



}
