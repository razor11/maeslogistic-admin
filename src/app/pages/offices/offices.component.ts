import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { BranchOfficesService } from './../../core/services/branch-offices/branch-offices.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit, AfterViewInit {

  constructor(
              private branchesService: BranchOfficesService,
              public snackBar: SnackbarService,
              public dialog: MatDialog
              ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
