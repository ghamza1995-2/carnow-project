import { Component, inject, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicles.model';
import { VehicleCardComponent } from '../vehicle-card-component/vehicle-card-component';
import { Select, Store } from '@ngxs/store';
import { VehicleState } from '../../store/vehicle.state';
import { Observable } from 'rxjs';
import { LoadVehicles } from '../../store/vehicle.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-vehicles-list',
  imports: [VehicleCardComponent, AsyncPipe],
  templateUrl: './vehicles-list-component.html',
  styleUrl: './vehicles-list-component.scss',
})
export class VehiclesListComponent implements OnInit {
  vehicles$: Observable<Vehicle[] | undefined> = inject(Store).select(
    VehicleState.getVehicles
  );
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(new LoadVehicles());
  }
}
