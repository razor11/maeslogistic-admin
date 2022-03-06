import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { EmbarcationsService } from 'src/app/core/services/embarcations/embarcations.service';
import { embarcation } from 'src/app/models/embarcation';

@Component({
  selector: 'app-embarcations',
  templateUrl: './embarcations.component.html',
  styleUrls: ['./embarcations.component.css']
})
export class EmbarcationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  isLoading: boolean = true;
  
  isDeleting: boolean = false;

  totalRows = 0;
  pageSize = 5;
  currentPage = 1;
  pageEvent: PageEvent;

  displayedColumns: string[] = ['id',
  'EstimatedDepartureDate',
  'EstimatedArrivingDate',
  'VeselNumber',
  'LogisticOperatorId'
];


dataSource: MatTableDataSource<embarcation> = new MatTableDataSource();

data: embarcation[] = [];
added = true;

  constructor(
    private embarcationService: EmbarcationsService
  ) { }

  ngOnInit(): void {
    this.loadEmbarcations();
  }
  loadEmbarcations()
  {
    this.isLoading = true;
    this.embarcationService.getAll(this.currentPage, this.pageSize)
    .pipe(first())    
    .subscribe((data) => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

}
