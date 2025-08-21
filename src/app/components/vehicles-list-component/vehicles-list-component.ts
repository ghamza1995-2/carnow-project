import { Component, inject, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicles.model';
import { VehicleCardComponent } from '../vehicle-card-component/vehicle-card-component';
import { Store } from '@ngxs/store';
import { VehicleState } from '../../store/vehicle.state';
import { Observable, tap } from 'rxjs';
import { LoadVehicles } from '../../store/vehicle.actions';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles-list',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    VehicleCardComponent,
    AsyncPipe,
    TitleCasePipe,
  ],
  templateUrl: './vehicles-list-component.html',
  styleUrl: './vehicles-list-component.scss',
})
export class VehiclesListComponent implements OnInit {
  store = inject(Store);
  vehicles$ = this.store.select(VehicleState.getVehicles);

  sortOptionList = ['price', 'year', 'mileage'];
  sortOrderList = ['ascending', 'descending'];

  sortOption = new FormControl('');
  sortOrder = new FormControl('');

  ngOnInit(): void {
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

  sort(vehicles: Vehicle[] | null | undefined): Vehicle[] | null | undefined {
    let sortOption = this.sortOption.value ?? '';
    let sortOrder = this.sortOrder.value ?? '';
    let sortedVehicles: Vehicle[] | null | undefined = [];

    switch (sortOption) {
      case 'price':
        sortedVehicles = vehicles?.sort((a, b) => a.price - b.price);
        break;
      case 'year':
        sortedVehicles = vehicles?.sort((a, b) => a.year - b.year);
        break;
      case 'mileage':
        sortedVehicles = vehicles?.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        sortedVehicles = vehicles;
        break;
    }

    if (sortOrder === 'descending') {
      if (sortedVehicles?.length) {
        sortedVehicles = sortedVehicles.toReversed();
      }
    }

    return sortedVehicles;
  }
}
