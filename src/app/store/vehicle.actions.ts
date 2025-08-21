import { Vehicle } from '../models/vehicles.model';

export class LoadVehicles {
  static readonly type = '[Vehicle] Load';
}

export class UpdateVehicle {
  static readonly type = '[Vehicle] Update';

  constructor(public payload: Vehicle, public id: string) {}
}
