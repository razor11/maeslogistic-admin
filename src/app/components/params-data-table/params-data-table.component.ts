import { MatTableDataSource } from '@angular/material/table';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-params-data-table',
  templateUrl: './params-data-table.component.html',
  styleUrls: ['./params-data-table.component.css'],
})
export class ParamsDataTableComponent implements OnInit {
  @Input() dataTable: any[] = [];
  @Input() displayedColumns: any;

  @Output() public updateParam = new EventEmitter<number>();
  @Output() public deleteParam = new EventEmitter<number>();

  dataSource!: any;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataTable);
  }

  editParam(value: any) {
    this.updateParam.emit(value);
  }

  removeParam(value:any){
    this.deleteParam.emit(value);
  }

}
