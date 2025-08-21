import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngxs/store';
import {
  BehaviorSubject,
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  tap,
} from 'rxjs';
import { VehicleState } from '../../store/vehicle.state';
import { Vehicle } from '../../models/vehicles.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Constants } from '../../constants/constants';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';
import { LoadVehicles } from '../../store/vehicle.actions';

@Component({
  selector: 'app-vehicle-component',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    NgxCurrencyDirective,
    AsyncPipe,
    CurrencyPipe,
    DecimalPipe,
    RouterLink,
  ],
  templateUrl: './vehicle-component.html',
  styleUrl: './vehicle-component.scss',
})
export class VehicleComponent implements OnInit {
  vehicle: Vehicle | undefined;

  store = inject(Store);
  route = inject(ActivatedRoute);

  term = new FormControl<number>(0);
  deposit = new FormControl<number>(0);
  creditAmount$ = new BehaviorSubject<number>(0);
  monthlyPayment = 0;

  termList: number[] = [];

  ngOnInit(): void {
    this.checkVehiclesLoaded();
    this.getVehicle();
    this.populateTermsList();
    this.setFormControls();
    this.watchTermValueChanges();
    this.watchDepositValueChanges();
    this.watchCreditAmountValueChanges();
  }

  private populateTermsList(): void {
    for (let i = Constants.MINIMUM_TERM; i <= Constants.MAXIMUM_TERM; i++) {
      this.termList.push(i);
    }
  }

  private setFormControls(): void {
    this.term.setValue(this.termList[this.termList.length - 1]);
    if (this.vehicle) {
      const initialDepositValue = this.vehicle.price * 0.1;
      this.deposit.setValue(initialDepositValue);
      this.setCreditAmount(initialDepositValue);
    }
  }

  private setCreditAmount(deposit: number): void {
    let creditAmount = this.vehicle ? this.vehicle.price - deposit : 0;
    this.creditAmount$.next(creditAmount);
  }

  private setMonthlyPayment(): void {
    const term = this.term.value;
    if (term) {
      this.monthlyPayment = this.creditAmount$.value / term;
    }
  }

  private checkVehiclesLoaded(): void {
    this.store
      .select(VehicleState.areVehiclesLoaded)
      .pipe(
        tap((vehiclesLoaded) => {
          if (!vehiclesLoaded) {
            this.store.dispatch(new LoadVehicles());
          }
        })
      )
      .subscribe();
  }

  private getVehicle(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.store
      .select(VehicleState.getVehicle)
      .pipe(
        map((fn) => fn(vehicleId)),
        tap((value) => (this.vehicle = value))
      )
      .subscribe();
  }

  private watchTermValueChanges(): void {
    this.term.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((_) => this.setMonthlyPayment());
  }

  private watchDepositValueChanges(): void {
    this.deposit.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        const creditAmount = value ?? 0;
        this.setCreditAmount(creditAmount);
      });
  }

  private watchCreditAmountValueChanges(): void {
    this.creditAmount$.subscribe((value) => {
      if (value) {
        this.setMonthlyPayment();
      }
    });
  }
}
