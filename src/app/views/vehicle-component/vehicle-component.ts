import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { VehicleState } from '../../store/vehicle.state';
import { Vehicle } from '../../models/vehicles.model';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-component',
  imports: [AsyncPipe],
  templateUrl: './vehicle-component.html',
  styleUrl: './vehicle-component.scss',
})
export class VehicleComponent implements OnInit {
  vehicle$?: Observable<Vehicle | undefined>;
  store = inject(Store);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.vehicle$ = this.store
        .select(VehicleState.getVehicle)
        .pipe(map((fn) => fn(vehicleId)));
    }
  }
}
