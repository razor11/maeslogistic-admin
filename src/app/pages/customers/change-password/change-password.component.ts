import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
  }

  onCancel(): void {
     this.dialogRef.close();
  }

}
