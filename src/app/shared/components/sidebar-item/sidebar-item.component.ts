import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { IMenuItem } from '@app/shared/models/menu-item.model';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  @Input({ required: true }) menuItem!: IMenuItem;
  @Input() isCollapsed: boolean = false;
}
