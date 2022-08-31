import { GoogleAddressService } from './../../../core/services/google-address/google-address.service';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { first } from 'rxjs/operators';
import { BranchOfficesService } from './../../../core/services/branch-offices/branch-offices.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';
import { Offices } from 'src/app/models/offices';

@Component({
  selector: 'app-add-update-branch-office',
  templateUrl: './add-update-branch-office.component.html',
  styleUrls: ['./add-update-branch-office.component.css'],
})
export class AddUpdateBranchOfficeComponent implements OnInit, AfterViewInit {
  branchOfficeForm: FormGroup;
  isAddMode: boolean = true;
  title: string = '';
  branchOffice: Offices[];
  autocomplete: google.maps.places.Autocomplete;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  id: any;
  @Input() addressType: string;
  place!: any;
  @ViewChild('addressField') addressField: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUpdateBranchOfficeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private branchOfficeService: BranchOfficesService,
    public snackBar: SnackbarService,
    private googleAddrService: GoogleAddressService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getPlaceAutomplete();
  }

  createForm(): void {
    this.data
      ? ((this.isAddMode = false), (this.title = 'Update'))
      : ((this.isAddMode = true), (this.title = 'Add'));

    this.branchOfficeForm = this.fb.group({
      Name: [, [Validators.required, Validators.minLength(5)]],
      Country: ['', [Validators.required]],
      State: ['', [Validators.required]],
      ZipCode: ['', [Validators.required, Validators.minLength(5)]],
      City: ['', [Validators.required]],
      Street: ['', Validators.required],
      Suite: [''],
      Latitude: ['', Validators.required],
      Longitude: ['', Validators.required],
      ContactName: ['', Validators.required],
      ContactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });

    if (!this.isAddMode) {
      this.branchOfficeForm.patchValue(this.data);
    }
  }

  private getPlaceAutomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressField.nativeElement,
      {
        componentRestrictions: { country: ['us', 'ca'] },
        fields: ['address_components', 'geometry'],
        types: ['address'],
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.place = this.autocomplete.getPlace();
      this.formattedAddress = this.googleAddrService.getFormattedAddress(
        this.place
      );
      this.patchGoogleAddress();
    });
  }

  patchGoogleAddress() {
    const Street =
      this.googleAddrService.getStreetNumber(this.place) + ' ' +
      this.googleAddrService.getStreet(this.place);
    const ZipCode = this.googleAddrService.getPostCode(this.place);
    const City = this.googleAddrService.getLocality(this.place);
    const Country = this.googleAddrService.getCountry(this.place);
    const State = this.googleAddrService.getState(this.place);
    const Latitude = this.place.geometry!.location!.lat().toString();
    const Longitude = this.place.geometry!.location!.lng().toString();

    this.branchOfficeForm.patchValue({
      Street: Street,
      ZipCode: ZipCode,
      City: City,
      Country: Country,
      State: State,
      Latitude: Latitude,
      Longitude: Longitude,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.branchOfficeForm.invalid) {
      return;
    }
    if(this.isAddMode){
      this.addBranchOffice();
    }
    else{
      this.updateBranchOffice()
    }

  }

  addBranchOffice() {
    this.branchOfficeService
      .addBranchOffice(this.branchOfficeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'The office was added successfully',
            'dismiss'
          );
        },
        error: (e) => console.log(e),
        complete: () => this.dialogRef.close(),
      });
  }

  updateBranchOffice() {
    this.branchOfficeService
      .updateBranchOffice(this.data.id, this.branchOfficeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'The office was updated successfully',
            'dismiss'
          );
        },
        error: (e) => console.log(e),
        complete: () => this.dialogRef.close(),
      });
  }
}
