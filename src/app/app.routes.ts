import { Routes } from '@angular/router';
import { HomeComponent } from './views/home-component/home-component';
import { VehicleComponent } from './views/vehicle-component/vehicle-component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'vehicles/:id',
    component: VehicleComponent,
  },
];
