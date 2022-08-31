import { MatTableDataSource } from '@angular/material/table';
import { AddUpdateZoneComponent } from './add-update-zone/add-update-zone.component';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './../../core/services/snackbar/snackbar.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ZonesService } from 'src/app/core/services/zones/zones.service';
import { Zones } from 'src/app/models/zones';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css'],
})
export class ZonesComponent implements OnInit, AfterViewInit {
  zones: Zones[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = [
    'Description',
    'Max distance',
    'Fee',
    'Actions',
  ];
  id: number;
  dataSource: MatTableDataSource<Zones> = new MatTableDataSource();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private zonesService: ZonesService,
    public snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'updated', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  loadData() {
    this.isLoadingResults = true;
    this.zonesService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
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
        this.loadData();
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
