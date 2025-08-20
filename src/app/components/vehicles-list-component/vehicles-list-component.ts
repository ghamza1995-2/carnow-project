import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicles.model';
import { VehicleCardComponent } from '../vehicle-card-component/vehicle-card-component';

@Component({
  selector: 'app-vehicles-list',
  imports: [VehicleCardComponent],
  templateUrl: './vehicles-list-component.html',
  styleUrl: './vehicles-list-component.scss',
})
export class VehiclesListComponent implements OnInit {
  @Input() vehicles: Vehicle[] = [];

  ngOnInit(): void {}
}
