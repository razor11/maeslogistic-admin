import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { first } from 'rxjs';
import { LogisticOperatorsService } from 'src/app/core/services/logistic-operators/logistic-operators.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { logisticOperator } from 'src/app/models/logistic-operator';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { Parameters } from 'src/app/models/parameters';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-lo-detail-view',
  templateUrl: './lo-detail-view.component.html',
  styleUrls: ['./lo-detail-view.component.css'],
})
export class LoDetailViewComponent implements OnInit {
  id: number;
  form: FormGroup;
  submited = false;
  operator: logisticOperator;
  dataLoad = false;
  countries: Parameters[];
  hide = true;

  actionText = 'Dismiss';

  constructor(
    private logisticOperatorsService: LogisticOperatorsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackbarService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.countriesService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.countries = data;
      });

    this.form = this.fb.group({
      id: [''],
      Name: ['', Validators.required],
      Street: ['', Validators.required],
      Suite: ['', Validators.required],
      City: ['', Validators.required],
      ZipCode: ['', [Validators.required, Validators.minLength(5)]],
      Country: ['', Validators.required],
      ContactNumber: ['', Validators.required],
    });

    this.loadData();
    this.form.disable();
  }

  loadData() {
    this.logisticOperatorsService
      .getById(this.id)
      .pipe(first())
      .subscribe((data) => {
        this.form.patchValue(data);
        console.log(data);
        this.dataLoad = false;
        this.operator = data;
        this.dataLoad = true;
      });
  }

  confirmDialog(): void {
    const message = `Are you sure you want to apply the changes?`;
    const dialogData = new ConfirmDialogModel('Confirm Changes', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onSubmit();
      } else {
        this.loadData();
      }
    });
  }

  private updateOperator() {
    this.logisticOperatorsService
      .updateLogisticOperator(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.snackBar.openSnackBar('Operator updated', this.actionText);
          this.loadData();
        },

        error: (e) => this.snackBar.openSnackBar(e, this.actionText),

        complete: () => this.readMode(),
      });
  }

  editMode() {
    this.form.enable();
    this.hide = false;
  }

  readMode() {
    this.form.disable();
    this.hide = true;
  }

  onSubmit() {
    this.submited = true;

    if (this.form.invalid) {
      return;
    } else {
      this.updateOperator();
    }
  }
}
