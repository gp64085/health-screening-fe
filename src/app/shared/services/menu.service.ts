import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _isCollapsed = signal<boolean>(false);

  /**
   * Get the current collapsed state as a readonly signal
   */
  collapsed = this._isCollapsed.asReadonly();

  /**
   * Get the current collapsed state synchronously
   */
  get isCollapsed(): boolean {
    return this._isCollapsed();
  }

  /**
   * Toggle the isCollapsed state of the menu. If the menu is currently
   * collapsed, it will be expanded. If it is currently expanded, it will
   * be collapsed.
   */
  toggleCollapse(): void {
    this._isCollapsed.set(!this._isCollapsed());
  }

  /**
   * Set the collapsed state explicitly
   * @param collapsed - The desired collapsed state
   */
  setCollapsed(collapsed: boolean): void {
    this._isCollapsed.set(collapsed);
  }

  /**
   * Expand the menu
   */
  expand(): void {
    this._isCollapsed.set(false);
  }

  /**
   * Collapse the menu
   */
  collapse(): void {
    this._isCollapsed.set(true);
  }
}
