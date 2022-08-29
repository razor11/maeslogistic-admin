import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './../../core/services/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { ZonesService } from 'src/app/core/services/zones/zones.service';
import { Zones } from 'src/app/models/zones';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  zones: Zones[];
  isLoadingResults = true;
  id: number;

  constructor(private zonesService: ZonesService,
    public snackBar: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  loadData(){
    this.zonesService.getAll()
    .pipe(first())
    .subscribe({

    })

  }

}
