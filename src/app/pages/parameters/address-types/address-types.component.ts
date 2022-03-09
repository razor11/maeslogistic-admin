import { MatDialog } from '@angular/material/dialog';
import { AddressTypesService } from './../../../core/services/address-types/address-types.service';
import { Component, OnInit } from '@angular/core';
import { Parameters } from 'src/app/models/parameters';
import { first } from 'rxjs';

@Component({
  selector: 'app-address-types',
  templateUrl: './address-types.component.html',
  styleUrls: ['./address-types.component.css'],
})
export class AddressTypesComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = [ 'Description', 'Actions'];
  data: Parameters[] = [];
  added = true;

  constructor(
    private addrTypes: AddressTypesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData()
  }


 loadData(){
   this.isLoading = true;
   this.addrTypes.getAll().pipe(first())
   .subscribe((data) => {
     this.data = data;
     this.isLoading = false
   })
 }

}
