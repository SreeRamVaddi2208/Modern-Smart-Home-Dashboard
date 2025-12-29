import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Home Component
 * Displays project overview and introduction
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  sensors = [
    { name: 'Temperature', icon: 'fas fa-thermometer-half text-danger', description: 'Room temperature in Celsius (°C)' },
    { name: 'Humidity', icon: 'fas fa-tint text-info', description: 'Air humidity percentage (%)' },
    { name: 'Energy Usage', icon: 'fas fa-bolt text-warning', description: 'Power consumption in kilowatt-hours (kWh)' },
    { name: 'Motion Detection', icon: 'fas fa-running text-success', description: 'Binary indicator (1 = motion detected, 0 = no motion)' },
    { name: 'Appliance Status', icon: 'fas fa-plug text-primary', description: 'State of appliances (ON/OFF)' }
  ];
}

