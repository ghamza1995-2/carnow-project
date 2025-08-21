import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Vehicle } from '../models/vehicles.model';
import { inject } from '@angular/core';
import { VehiclesService } from '../services/vehicles-service';
import { LoadVehicles, UpdateVehicle } from './vehicle.actions';
import { tap } from 'rxjs';

export class VehicleStateModel {
  vehicles?: Vehicle[];
  areVehiclesLoaded?: boolean;
}

@State<VehicleStateModel>({
  name: 'vehicles',
  defaults: {
    vehicles: [],
    areVehiclesLoaded: false,
  },
})
export class VehicleState {
  vehiclesService = inject(VehiclesService);

  @Selector()
  static getVehicles(state: VehicleStateModel) {
    return state.vehicles;
  }

  @Selector()
  static areVehiclesLoaded(state: VehicleStateModel) {
    return state.areVehiclesLoaded;
  }

  @Selector()
  static getVehicle(state: VehicleStateModel) {
    return (id: string | undefined) => {
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
          areVehiclesLoaded: true,
        });
      })
    );
  }

  @Action(UpdateVehicle)
  updateVehicle(
    { getState, setState }: StateContext<VehicleStateModel>,
    { payload, id }: UpdateVehicle
  ) {
    const state = getState();
    const vehiclesList = [...state.vehicles!];
    const vehicleIndex = vehiclesList.findIndex((vehicle) => vehicle.id === id);
    vehiclesList[vehicleIndex] = payload;

    setState({
      ...state,
      vehicles: vehiclesList,
    });
  }
}
