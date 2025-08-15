import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly _isCollapsed = new BehaviorSubject<boolean>(false);

  /**
   * Observable that emits the current collapsed state of the menu
   */
  readonly isCollapsed$: Observable<boolean> = this._isCollapsed.asObservable();

  /**
   * Get the current collapsed state synchronously
   */
  get isCollapsed(): boolean {
    return this._isCollapsed.value;
  }

  /**
   * Toggle the isCollapsed state of the menu. If the menu is currently
   * collapsed, it will be expanded. If it is currently expanded, it will
   * be collapsed.
   */
  toggleCollapse(): void {
    this._isCollapsed.next(!this._isCollapsed.value);
  }

  /**
   * Set the collapsed state explicitly
   * @param collapsed - The desired collapsed state
   */
  setCollapsed(collapsed: boolean): void {
    this._isCollapsed.next(collapsed);
  }

  /**
   * Expand the menu
   */
  expand(): void {
    this._isCollapsed.next(false);
  }

  /**
   * Collapse the menu
   */
  collapse(): void {
    this._isCollapsed.next(true);
  }
}
