import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Vehicle } from '../models/vehicles.model';
import { inject } from '@angular/core';
import { VehiclesService } from '../services/vehicles-service';
import { LoadVehicles } from './vehicle.actions';
import { tap } from 'rxjs';

export class VehicleStateModel {
  vehicles?: Vehicle[];
}

@State<VehicleStateModel>({
  name: 'vehicles',
  defaults: {
    vehicles: [],
  },
})
export class VehicleState {
  vehiclesService = inject(VehiclesService);

  @Selector()
  static getVehicles(state: VehicleStateModel) {
    return state.vehicles;
  }

  @Selector()
  static getVehicle(state: VehicleStateModel) {
    return (id: string) => {
      return state.vehicles?.find((vehicle) => vehicle.id === id);
    };
  }

  @Action(LoadVehicles)
  loadVehicles({ getState, setState }: StateContext<VehicleStateModel>) {
    return this.vehiclesService.loadVehicles().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          vehicles: result,
        });
      })
    );
  }
}
