import { Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicles.model';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-vehicle-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    CurrencyPipe,
    DecimalPipe,
    RouterLink,
  ],
  templateUrl: './vehicle-card-component.html',
  styleUrl: './vehicle-card-component.scss',
})
export class VehicleCardComponent {
  @Input() vehicle: Vehicle | null = null;
}
