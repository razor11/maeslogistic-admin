import { Customers } from './../../models/customers';
import { first } from 'rxjs/operators';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;



 clients: Customers[] = [];
 isDeleting: boolean = false;
 totalRows = 0;
 pageSize = 5;
 currentPage = 0;
 pageEvent: PageEvent;
 isLoading: boolean = true;


  displayedColumns: string[] = ['Id','Name','Email','User Name','Actions'];
  dataSource: MatTableDataSource<Customers> = new MatTableDataSource();

  constructor(private customersService: DataCustomersService) { }

  ngOnInit() {
   this.loadCustomers();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;



  }

  loadCustomers(){
    this.isLoading = true;
    this.customersService.getAll(this.currentPage, this.pageSize)
    .pipe(first())
    .subscribe(data => {this.dataSource.data = data.customers
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = data.CustomerCant;
      });
      this.isLoading = false;

      }  );
  }


  pageChanged(event: PageEvent){
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadCustomers();


  }

  deleteClient(id:any)
  {

    const client = this.dataSource.data.find(x => x.id === id);
    console.log(client)
    if(!client) return;
    this.isDeleting = true;
    this.customersService.deleteClient(Number(id))
    .pipe(first())
    .subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(x => x.id !== id)
      this.loadCustomers();
    })


  }




}


/*
.subscribe(data => {this.dataSource = new MatTableDataSource<Customers>(data);
  this.dataSource.paginator = this.paginator;
});
} */
