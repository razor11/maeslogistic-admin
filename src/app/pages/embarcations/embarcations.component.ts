import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { EmbarcationsService } from 'src/app/core/services/embarcations/embarcations.service';
import { embarcation } from 'src/app/models/embarcation';
import { EmAddComponent } from './dialogs/em-add/em-add.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-embarcations',
  templateUrl: './embarcations.component.html',
  styleUrls: ['./embarcations.component.css'],
})
export class EmbarcationsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = true;

  isDeleting: boolean = false;

  totalRows = 0;
  pageSize = 5;
  currentPage = 1;
  pageEvent: PageEvent;

  displayedColumns: string[] = [
    'EstimatedDepartureDate',
    'EstimatedArrivingDate',
    'VeselNumber',
    'Status',
    'Actions',
  ];

  dataSource: MatTableDataSource<embarcation> = new MatTableDataSource();

  data: embarcation[] = [];
  added = true;

  constructor(
    private embarcationService: EmbarcationsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmbarcations();
  }
  loadEmbarcations() {
    this.isLoading = true;
    this.embarcationService
      .getAll(this.currentPage, this.pageSize)
      .pipe(first())
      .subscribe((data) => {
        this.dataSource.data = data;
        this.isLoading = false;
        console.log(this.dataSource.data);
      });
  }

  openAddDialog(param: any): void {
    const dialogRef = this.dialog.open(EmAddComponent, {
      width: '580px',
      data: { param },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        this.loadEmbarcations();
      }
    });
  }

  confirmDialog(id: string): void {
    const message = `Are you want to delete this customer?`;
    const dialogData = new ConfirmDialogModel('Confirm Changes', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  deleteEmbarcation(id: any) {
    const client = this.dataSource.data.find((x) => x.id === id);
    console.log(client);
    if (!client) return;
    this.isDeleting = true;
    this.embarcationService
      .deleteEmbarcation(Number(id))
      .pipe(first())
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((x) => x.id !== id);
        this.loadEmbarcations();
      });
  }
}
