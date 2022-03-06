import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { LogisticOperatorsService } from 'src/app/core/services/logistic-operators/logistic-operators.service';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-lo-add-update',
  templateUrl: './lo-add-update.component.html',
  styleUrls: ['./lo-add-update.component.css']
})
export class LoAddUpdateComponent implements OnInit {
  form: any;
  error = '';
  logisticOperator: FormGroup;
  id: string;
  submited = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loService: LogisticOperatorsService,
    private fb: FormBuilder,
    private snackBar: SnackbarService
    
  ) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];

    this.logisticOperator = this.fb.group({      
      Name: ['', Validators.required],
      Country: ['', Validators.required],
      ZipCode: ['', Validators.required],
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Suite: ['', Validators.required],
      ContactNumber: ['', Validators.required],      
    })
  }

  onSubmit(){
    this.submited = true;
    this.createLogisticOperator();
  }

  private createLogisticOperator(){
    const data = Object.assign(this.logisticOperator.value)
    
    console.log(data);
    this.loService
    .addLogisticOperator(data)
    .pipe(first())
    .subscribe(data => {
      if(data.status===202){
        this.error = data.error;
        let actionText = 'Dismiss';
        this.snackBar.openSnackBar(this.error, actionText);
        return
      }else
      {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    },
    error => {
       this.error = error;
       let actionText = 'Dismiss'
       this.snackBar.openSnackBar(this.error, actionText);
    }
    );
  }

}
