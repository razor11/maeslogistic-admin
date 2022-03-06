import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { EmbarcationsService } from 'src/app/core/services/embarcations/embarcations.service';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-em-ad-update',
  templateUrl: './em-ad-update.component.html',
  styleUrls: ['./em-ad-update.component.css']
})
export class EmAdUpdateComponent implements OnInit {
  form: any;
  error = '';
  embarcation: FormGroup;
  id: string;
  submited=false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private embarcationService: EmbarcationsService,
    private fb: FormBuilder,
    private snackBar: SnackbarService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.embarcation = this.fb.group({
      EstimatedDepartureDate:['',Validators.required],
      EstimatedArrivingDate:['',Validators.required],
      VeselNumber:['',Validators.required],
      LogisticOperatorId:['',Validators.required],
    })

    }
    onSubmit(){
      this.submited = true;
      this.createEmbarcation();
    }

    
  private createEmbarcation(){
    const data = Object.assign(this.embarcation.value)
    
    console.log(data);
    this.embarcationService
    .addEmbarcation(data)
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
