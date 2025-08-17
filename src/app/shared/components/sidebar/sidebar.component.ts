import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import type { UserRole } from '@app/core/enums';
import type { IMenuItem } from '@app/shared/models/menu-item.model';
import { MenuService } from '@app/shared/services/menu.service';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AsyncPipe, CommonModule, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  menuItems = input.required<IMenuItem[]>();
  userRole = input.required<UserRole>();

  protected readonly menuService = inject(MenuService);
}
