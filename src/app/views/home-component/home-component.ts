import { Component } from '@angular/core';
import { VehiclesListComponent } from '../../components/vehicles-list-component/vehicles-list-component';

@Component({
  selector: 'app-home',
  imports: [VehiclesListComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {}
