import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnDestroy,
  type OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { UserRole } from '@app/core/enums';
import type { IMenuItem } from '@app/shared/models/menu-item.model';
import { Subject, takeUntil } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly destroy$ = new Subject<void>();

  protected currentRole: UserRole = UserRole.USER;
  protected readonly menuItems: IMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/dashboard',
      roles: [UserRole.ADMIN, UserRole.USER],
    },
    {
      label: 'Admin',
      icon: 'pi pi-shield',
      roles: [UserRole.ADMIN],
      expanded: false,
      children: [
        {
          label: 'Manage Users',
          icon: 'pi pi-users',
          route: '/admin/manage-users',
          roles: [UserRole.ADMIN],
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.initializeUserRole();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeUserRole(): void {
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (user) => {
        this.currentRole = user?.role ?? UserRole.USER;
      },
      error: (error) => {
        console.error('Error fetching user role:', error);
        this.handleAuthError();
      },
    });
  }

  private handleAuthError(): void {
    this.router.navigate(['/login']);
  }
}
