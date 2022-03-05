import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { LogisticOperatorsService } from 'src/app/core/services/logistic-operators/logistic-operators.service';
import { logisticOperator } from 'src/app/models/logistic-operator';

@Component({
  selector: 'app-logistic-operators',
  templateUrl: './logistic-operators.component.html',
  styleUrls: ['./logistic-operators.component.css']
})
export class LogisticOperatorsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = true;
  
  isDeleting: boolean = false;

  totalRows = 0;
  pageSize = 5;
  currentPage = 1;
  pageEvent: PageEvent;

  displayedColumns: string[] = ['Id',
  'Name',
  'Country',
  'Zip code',
  'City',
  'Street',
  'Suite',
  'Contact number'
];

dataSource: MatTableDataSource<logisticOperator> = new MatTableDataSource();

data: logisticOperator[] = [];
added = true;

  constructor(
    private logisticOperatorsService: LogisticOperatorsService
  ) { }

  ngOnInit(): void {
    this.loadLogisticOperators();
  }

  loadLogisticOperators()
  {
    this.isLoading = true;
    this.logisticOperatorsService.getAll(this.currentPage, this.pageSize)
    .pipe(first())    
    .subscribe((data) => {
      this.data = data;
      this.isLoading = false;
    });
  }

}