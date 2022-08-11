import { AddUpdateBranchOfficeComponent } from './add-update-branch-office/add-update-branch-office.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { BranchOfficesService } from './../../core/services/branch-offices/branch-offices.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css'],
})
export class OfficesComponent implements OnInit, AfterViewInit {
  constructor(
    private branchesService: BranchOfficesService,
    public snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  addDialog(id?: any): void {
    const dialogRef = this.dialog.open(AddUpdateBranchOfficeComponent, {
      width: '580px',
      data: id,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }

  updateDialog(param: any): void {
    const dialogRef = this.dialog.open(AddUpdateBranchOfficeComponent, {
      width: '580px',
      data: param,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }
}
