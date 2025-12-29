import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ExplorationComponent } from './features/exploration/exploration.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

/**
 * Application Routes Configuration
 * Implements lazy loading for feature modules
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home - Smart Home IoT Explorer'
  },
  {
    path: 'exploration',
    component: ExplorationComponent,
    title: 'Data Exploration - Smart Home IoT Explorer'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard - Smart Home IoT Explorer'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];





