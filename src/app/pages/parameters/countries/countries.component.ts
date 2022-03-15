import { MatDialog } from '@angular/material/dialog';
import { CountriesService } from './../../../core/services/countries/countries.service';
import { Component, OnInit } from '@angular/core';
import { Parameters } from 'src/app/models/parameters';
import { ParametersUpdateDialogComponent, updateDialogModel } from 'src/app/components/parameters-dialogs/parameters-update-dialog/parameters-update-dialog.component';
import { first } from 'rxjs';
import { AddParameterDialogComponent } from 'src/app/components/parameters-dialogs/add-parameter-dialog/add-parameter-dialog.component';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = ['Description', 'Actions'];
  data: Parameters[] = [];
  added = true;

  constructor(
    private countriesService: CountriesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }


  openUpdateDialog(param: any): void {
    const title = `Update Country`;
    const message = `rewrite the field below with the new record that would you like to upgrade`;
    const dialogBodyText = new updateDialogModel(title, message);
    const dialogRef = this.dialog.open(ParametersUpdateDialogComponent, {
      width: '480',
      data: { param, dialogBodyText },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.countriesService
          .update(param.id, res)
          .pipe(first())
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }

  addDialog(): void {
    const title = `Add New Country`;
    const message = `Fill the field below with the new record`;
    const dialogBodyText = new updateDialogModel(title, message);
    const added = this.added;
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '480',
      data: { added, dialogBodyText },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.countriesService
          .addNew(res)
          .pipe(first())
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }

  loadData() {
    this.isLoading = true;
    this.countriesService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.data = data;
        this.isLoading = false;
      });
  }

  deleteCountry(id: any) {
    const addr = this.data.find((x) => x.id === id);
    if (!addr) return;
    this.countriesService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.data.filter((x) => x.id !== id);
        this.loadData();
      });
  }

}
