import { Component, input } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CardModule, SkeletonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  title = input.required<string>();
  value = input.required<string>();
  description = input<string>('');
  iconColor = input<string>('bg-blue-500');
  icon = input.required<PrimeIcons>();
  loading = input(false);
  growth = input(0);
}
