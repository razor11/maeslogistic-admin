import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { AddUpdatePackageComponent } from './add-update-package/add-update-package/add-update-package.component';
import { first, switchMap, startWith, catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Packages } from 'src/app/models/packages';
import { PackageCatalogService } from 'src/app/core/services/package-catalog/package-catalog.service';

@Component({
  selector: 'app-package-catalog',
  templateUrl: './package-catalog.component.html',
  styleUrls: ['./package-catalog.component.css'],
})
export class PackageCatalogComponent implements OnInit, AfterViewInit {
  title = 'Package Catalog';
  packageCatalog: Packages[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  pageSize = 5;
  currentPage = 0;
  pageEvent: PageEvent;

  displayedColumns: string[] = ['Description', 'Weigth', 'Price', 'Actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private packageCatService: PackageCatalogService,
    public dialog: MatDialog,
    public snackBar: SnackbarService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.packageCatService!.getAll(
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.packageCant;
          return data.packages;
        })
      )
      .subscribe((data) => {
        this.packageCatalog = data;
      });
  }

  addDialog(id?: any): void {
    const dialogRef = this.dialog.open(AddUpdatePackageComponent, {
      width: '580px',
      data: id,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.snackBar.openSnackBar('Record was added successfully', 'dismiss');
        this.loadData();
      }
    });
  }

  updateDialog(param: any): void {
    const dialogRef = this.dialog.open(AddUpdatePackageComponent, {
      width: '580px',
      data: param,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.snackBar.openSnackBar('Record was updated successfully', 'dismiss');
        this.loadData();
      }
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
