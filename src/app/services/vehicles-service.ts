import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicle } from '../models/vehicles.model';
import { VEHICLES_DATA } from '../data/vehicles.data';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  getVehicles(): Observable<Vehicle[]> {
    return of(VEHICLES_DATA);
  }
}
