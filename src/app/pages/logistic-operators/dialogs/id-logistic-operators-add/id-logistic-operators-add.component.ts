import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { LogisticOperatorsService } from 'src/app/core/services/logistic-operators/logistic-operators.service';
import { logisticOperator } from 'src/app/models/logistic-operator';
import { LogisticOperatorsComponent } from '../../logistic-operators/logistic-operators.component';

@Component({
  selector: 'app-id-logistic-operators-add',
  templateUrl: './id-logistic-operators-add.component.html',
  styleUrls: ['./id-logistic-operators-add.component.css']
})
export class IdLogisticOperatorsAddComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LogisticOperatorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: logisticOperator,
    private fb: FormBuilder,
    private loDataService:LogisticOperatorsService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      Country: ['', Validators.required],
      ZipCode: ['', Validators.required],
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Suite: ['', Validators.required],
      ContactNumber: ['', Validators.required],
    })
  }
  
  onNoClick(): void{
    this.dialogRef.close();
  }

  
  onSubmit(){
    if (this.form.valid) {
      this.loDataService
        .addLogisticOperator(this.form.value)
        .pipe(first())
        .subscribe(res => {
          this.dialogRef.close();
        });
    } else {
      return;
    }
  }      
}

