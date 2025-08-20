import { Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicles.model';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, RouterLink],
  templateUrl: './vehicle-card-component.html',
  styleUrl: './vehicle-card-component.scss',
})
export class VehicleCardComponent {
  @Input() vehicle: Vehicle | null = null;
}
