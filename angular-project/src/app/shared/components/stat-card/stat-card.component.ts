import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable Stat Card Component
 * Displays statistics in a card format
 */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  @Input() value: string | number = '';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() gradient: string = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
}





