import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-parameter-dialog',
  templateUrl: './add-parameter-dialog.component.html',
  styleUrls: ['./add-parameter-dialog.component.css'],
})
export class AddParameterDialogComponent implements OnInit {
  title: string;
  message: string;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddParameterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.title = this.data.dialogBodyText.title;
    this.message = this.data.dialogBodyText.message;
    this.form = this.fb.group({
      description: ['', Validators.required],
    });
  }

  onDismiss(): void {
    this.dialogRef.close();
  }
}

export class addDialogModel {
  constructor(public title: string, public message: string) {}
}
