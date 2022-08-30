import { AddUpdateZoneComponent } from './add-update-zone/add-update-zone.component';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './../../core/services/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { ZonesService } from 'src/app/core/services/zones/zones.service';
import { Zones } from 'src/app/models/zones';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css'],
})
export class ZonesComponent implements OnInit {
  zones: Zones[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = [
    'Description',
    'Max distance',
    'Fee',
    'Actions',
  ];
  id: number;

  constructor(
    private zonesService: ZonesService,
    public snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoadingResults = true;
    this.zonesService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.zones = data;
          this.isLoadingResults = false;
        },
      });
  }

  addDialog(id?: any): void {
    const dialogRef = this.dialog.open(AddUpdateZoneComponent, {
      width: '780px',
      data: id,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }

  updateDialog(param: any): void {
    const dialogRef = this.dialog.open(AddUpdateZoneComponent, {
      width: '780px',
      data: param,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadData();
        console.log('test');
      }
    });
  }

  deleteZone(id: any) {
    const zone = this.zones.find((x) => x.id === id);
    if (!zone) return;
    this.zonesService
      .deleteZone(Number(id))
      .pipe(first())
      .subscribe({
        next: () => {
          this.zones = this.zones.filter((x) => x.id !== id);
        },
        error: (e) => this.snackBar.openSnackBar(e, 'dismiss'),
        complete: () => {
          this.snackBar.openSnackBar(
            'The zone was  deleted succesfully',
            'Dismiss'
          );
          this.loadData();
        },
      });
  }
}
