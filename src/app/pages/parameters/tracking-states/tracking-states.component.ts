import {
  ParametersUpdateDialogComponent,
  updateDialogModel,
} from 'src/app/components/parameters-dialogs/parameters-update-dialog/parameters-update-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { TrackingStatusService } from 'src/app/core/services/tracking-status/tracking-status.service';
import { Parameters } from 'src/app/models/parameters';
import { AddParameterDialogComponent } from 'src/app/components/parameters-dialogs/add-parameter-dialog/add-parameter-dialog.component';

@Component({
  selector: 'app-tracking-states',
  templateUrl: './tracking-states.component.html',
  styleUrls: ['./tracking-states.component.css'],
})
export class TrackingStatesComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = ['Description', 'Actions'];
  data: Parameters[] = [];
  added = true;
  error: string = '';

  constructor(
    private trackingService: TrackingStatusService,
    public dialog: MatDialog,
    private snackService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.trackingService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.data = data;
        this.isLoading = false;
      });
  }

  openUpdateDialog(param: any): void {
    const title = `Update Tracking Status Type`;
    const message = `rewrite the field below with the new record that would you like to update`;
    const dialogBodyText = new updateDialogModel(title, message);
    const dialogRef = this.dialog.open(ParametersUpdateDialogComponent, {
      width: '480px',
      data: { param, dialogBodyText },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.trackingService
          .update(param.id, res)
          .pipe(first())
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }

  addDialog() {
    const title = `Add New Tracking Status Type`;
    const message = `Fill the field below with the new record`;
    const dialogBodyText = new updateDialogModel(title, message);
    const added = this.added;
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '480px',
      data: { added, dialogBodyText },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.trackingService
          .addNew(res)
          .pipe(first())
          .subscribe((data) => {
            let actionText = 'Dismiss';
            if(data.status >= 202 ){
              this.error = data.error;
              this.snackService.openSnackBar(this.error, actionText);
              return;
            }
            else{

              this.snackService.openSnackBar('Tracking Status Created', actionText);
              this.loadData();
            }

          });
      }
    });
  }

  deleteStatus(id: any) {
    const addr = this.data.find((x) => x.id === id);
    if (!addr) return;
    this.trackingService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.data.filter((x) => x.id !== id);
        this.loadData();
      });
  }
}
