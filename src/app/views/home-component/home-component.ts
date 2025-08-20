import { Component, inject, OnInit } from '@angular/core';
import { VehiclesListComponent } from '../../components/vehicles-list-component/vehicles-list-component';
import { VehiclesService } from '../../services/vehicles-service';
import { Vehicle } from '../../models/vehicles.model';

@Component({
  selector: 'app-home',
  imports: [VehiclesListComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  vehiclesService = inject(VehiclesService);
  vehicles: Vehicle[] = [];

  ngOnInit(): void {
    this.vehiclesService
      .getVehicles()
      .subscribe((data) => (this.vehicles = data));
  }
}
