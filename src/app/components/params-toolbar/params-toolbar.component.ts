import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-params-toolbar',
  templateUrl: './params-toolbar.component.html',
  styleUrls: ['./params-toolbar.component.css']
})
export class ParamsToolbarComponent implements OnInit {

  @Input() title: string;

  @Output() public addParam = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addNewParam(){
     this.addParam.emit();
  }

}
