import { first } from 'rxjs/operators';
import { LogisticOperatorsService } from 'src/app/core/services/logistic-operators/logistic-operators.service';
import { Parameters } from 'src/app/models/parameters';
import { embarcation } from './../../models/embarcation';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';
import {
  Component,
  forwardRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';
import { TrackingStatusService } from 'src/app/core/services/tracking-status/tracking-status.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-embarcations-form',
  templateUrl: './embarcations-form.component.html',
  styleUrls: ['./embarcations-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmbarcationsFormComponent),
      multi: true,
    },

    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmbarcationsFormComponent),
      multi: true,
    },
  ],
})
export class EmbarcationsFormComponent implements OnInit, AfterContentInit {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  embarcation: embarcation;
  lo: any[];
  trackingTypes: Parameters[];
  error: string = '';

  minDate: Date;
  maxDate: Date;

  @Input() id: any;
  @Input() data: any;

  @Output() public activateMode = new EventEmitter();
  @Output() public disabledMode = new EventEmitter();

  get value(): embarcation {
    return this.form.value;
  }

  set value(value: embarcation) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor(
    private fb: FormBuilder,
    private loService: LogisticOperatorsService,
    private trackingTypesService: TrackingStatusService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.createForm();
  }

  ngOnInit(): void {
    this.loadParams();
  }

  ngAfterContentInit() {
    if (this.id) {
      this.loadData();
      this.readMode();
    }

    this.subscriptions.push(
      this.form.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  createForm() {
    this.form = this.fb.group({
      EstimatedDepartureDate: [''],
      EstimatedArrivingDate: [''],
      VeselNumber: ['', Validators.required],
      LogisticOperator: this.fb.group({
        id: ['', Validators.required],
      }),
      WeigthCapacity: ['', Validators.required],
      volumeCapacity: ['', Validators.required],
      tracking: this.fb.group({
        id: ['', Validators.required],
      }),
    });
  }

  loadParams() {
    const LogisticOperators = this.loService.getAll(1, 50);
    const TrackingTypes = this.trackingTypesService.getAll();

    forkJoin([LogisticOperators, TrackingTypes])
      .pipe(first())
      .subscribe((data) => {
        this.lo = data[0];
        this.trackingTypes = data[1];
      });
  }

  loadData() {
    this.embarcation = this.data;
    this.form.patchValue({
      EstimatedDepartureDate: this.embarcation.EstimatedDepartureDate,
      EstimatedArrivingDate: this.embarcation.EstimatedArrivingDate,
      VeselNumber: this.embarcation.VeselNumber,
      LogisticOperator: {
        id: this.embarcation.logisticOperator.id,
      },
      WeigthCapacity: this.embarcation.WeigthCapacity,
      volumeCapacity: this.embarcation.volumeCapacity,
      tracking: {
        id: this.embarcation.tracking.id,
      },
    });
  }

  editMode() {
    this.form.enable();
  }

  readMode() {
    this.form.disable();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { embarcation: { valid: false } };
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
