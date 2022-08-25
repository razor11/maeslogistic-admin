import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { LogisticOperatorsService } from 'src/app/core/services/logistic-operators/logistic-operators.service';
import { logisticOperator } from 'src/app/models/logistic-operator';

@Component({
  selector: 'app-logistic-operators',
  templateUrl: './logistic-operators.component.html',
  styleUrls: ['./logistic-operators.component.css'],
})
export class LogisticOperatorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = true;

  isDeleting: boolean = false;

  totalRows = 0;
  pageSize = 20;
  currentPage = 1;
  pageEvent: PageEvent;

  displayedColumns: string[] = [
    'Id',
    'Name',
    'Country',
    'ContactNumber',
    'Actions',
  ];

  dataSource: MatTableDataSource<logisticOperator> = new MatTableDataSource();

  data: logisticOperator[] = [];
  added = true;

  constructor(
    private logisticOperatorsService: LogisticOperatorsService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadLogisticOperators();
  }

  loadLogisticOperators() {
    this.isLoading = true;
    this.logisticOperatorsService
      .getAll(this.currentPage, this.pageSize)
      .pipe(first())
      .subscribe((data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      });
  }

  deleteLogisticOperator(id: any) {
    const client = this.dataSource.data.find((x) => x.id === id);
    console.log(client);
    if (!client) return;
    this.isDeleting = true;
    this.logisticOperatorsService
      .deleteLogisticOperator(Number(id))
      .pipe(first())
      .subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.id !== id
          );
        },
        error: (e) => this.snackBar.openSnackBar(e, 'dismiss'),
        complete: () => {
          this.snackBar.openSnackBar(
            'The operator has been deleted',
            'dismiss'
          );
          this.loadLogisticOperators();
        },
      });
  }
}
