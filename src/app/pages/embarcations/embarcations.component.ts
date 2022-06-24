import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first, merge } from 'rxjs';
import { EmbarcationsService } from 'src/app/core/services/embarcations/embarcations.service';
import { embarcation } from 'src/app/models/embarcation';
import { EmAddComponent } from './dialogs/em-add/em-add.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-embarcations',
  templateUrl: './embarcations.component.html',
  styleUrls: ['./embarcations.component.css'],
})
export class EmbarcationsComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;

  isDeleting: boolean = false;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 5;
  currentPage = 0;
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private embarcationService: EmbarcationsService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.isLoadingResults = true;
    this.embarcationService
      .getAll(this.currentPage, this.pageSize)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.dataSource.data = data.embarcations;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = data.embarcationsCant;
          });
        },
        error: (e) => console.log(e),
        complete: () => {
          this.isLoadingResults = false;
        },
      });
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  openAddDialog(param: any): void {
    const dialogRef = this.dialog.open(EmAddComponent, {
      width: '580px',
      data: { param },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        this.router.navigate([`/embarcations/detail-view/${res}`]);
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
        this.deleteEmbarcation(id);
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
        this.loadData();
      });
  }
}
