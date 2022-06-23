import { EmbarcationsFormComponent } from 'src/app/components/embarcations-form/embarcations-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { EmbarcationsService } from 'src/app/core/services/embarcations/embarcations.service';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { embarcation } from 'src/app/models/embarcation';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { EmAddComponent } from '../dialogs/em-add/em-add.component';
import { calculatePercentageAvailable } from 'src/app/tools/utils';

@Component({
  selector: 'app-em-ad-update',
  templateUrl: './em-ad-update.component.html',
  styleUrls: ['./em-ad-update.component.css'],
})
export class EmAdUpdateComponent implements OnInit {
  @ViewChild(EmbarcationsFormComponent) EmbarcationsFormComponent: any;

  embarcationForm: FormGroup;
  error = '';
  embarcation: embarcation;
  id: number;
  submited = false;
  hide = true;

  availableWeight: string;
  availableVolumen: string;
  weightPercentage: number;
  volumePercentage: number;
  weightUsed: string;
  volumeUsed: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private embarcationService: EmbarcationsService,
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    public dialog: MatDialog
  ) {
    this.id = this.route.snapshot.params['id'];
    this.loadData();
  }

  ngOnInit() {
    this.embarcationForm = this.fb.group({
      embarcation: [],
    });
  }

  loadData() {
    this.embarcationService
      .getById(this.id)
      .pipe(first())
      .subscribe((data) => {
        this.embarcation = data;
        this.chartFormatter(data);
      });
  }

  chartFormatter(data: embarcation) {
    this.weightPercentage = calculatePercentageAvailable(
      Number(data.WeigthCapacityUsed),
      Number(data.WeigthCapacity)
    );

    console.log(this.weightPercentage);

    this.volumePercentage = calculatePercentageAvailable(
      Number(data.volumeCapacityUsed),
      Number(data.volumeCapacity)
    );

    this.availableWeight = (
      data.WeigthCapacity - data.WeigthCapacityUsed
    ).toFixed(1);
    this.availableVolumen = (
      data.volumeCapacity - data.volumeCapacityUsed
    ).toFixed(1);
    this.weightUsed = Number(data.WeigthCapacityUsed).toFixed(1);
    this.volumeUsed = Number(data.volumeCapacityUsed).toFixed(1);
  }

  private updateEmbarcaton() {
    this.embarcationService
      .upEmbarcation(
        this.id,
        this.embarcationForm.controls['embarcation'].value
      )
      .pipe(first())
      .subscribe((data) => {
        let actionText = 'Dismiss';
        if (data.status > 202) {
          this.error = data.error;
          this.snackBar.openSnackBar(this.error, actionText);
        } else {
          this.snackBar.openSnackBar('Embarcation updated', actionText);
          this.loadData();
          this.readMode();
        }
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
        this.saveChanges();
      }
    });
  }

  format(results: any) {
    return results.value + '%';
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmAddComponent, {
      width: '580px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() =>
            this.router.navigate([`/embarcations/detail-view/${res}`])
          );
      }
    });
  }

  readMode() {
    this.EmbarcationsFormComponent.readMode();
    this.hide = true;
  }

  editMode() {
    this.EmbarcationsFormComponent.editMode();
    this.hide = false;
  }

  saveChanges() {
    if (this.embarcationForm.invalid) {
      return;
    } else {
      this.updateEmbarcaton();
    }
  }
}
