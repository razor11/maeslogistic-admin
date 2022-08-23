import { first } from 'rxjs/operators';
import { AddUpdateBranchOfficeComponent } from './add-update-branch-office/add-update-branch-office.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { BranchOfficesService } from './../../core/services/branch-offices/branch-offices.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Offices } from 'src/app/models/offices';
import { timeHours } from 'd3';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css'],
})
export class OfficesComponent implements OnInit, AfterViewInit {
  branchOffices: Offices[];
  isLoadingResults = true;
  id: number;

  constructor(
    private branchesService: BranchOfficesService,
    public snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {}

  loadData() {
    this.branchesService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.branchOffices = data;
          this.isLoadingResults = false;
        },
        error: (e) => console.log(e),
      });
  }

  addDialog(id?: any): void {
    const dialogRef = this.dialog.open(AddUpdateBranchOfficeComponent, {
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
    const dialogRef = this.dialog.open(AddUpdateBranchOfficeComponent, {
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
}
