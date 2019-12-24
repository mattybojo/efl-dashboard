import { UserData } from './../../../shared/models/user-data.model';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: UserData;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Log out' } ];

  faSignInAlt = faSignInAlt;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              protected authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {

    this.user = this.authService.getUser();

    this.authService.getUserDataObservable().subscribe(user => {
      let index: number;
      if (user) {
        this.user = this.authService.getUser();
        index = this.userMenu.findIndex(item => item.title === 'Log in');
        if (index > -1) {
          this.userMenu.splice(index, 1, { title: 'Log out'} );
        }
      } else {
        this.user = null;
        index = this.userMenu.findIndex(item => item.title === 'Log out');
        if (index > -1) {
          this.userMenu.splice(index, 1, { title: 'Log in'} );
        }
      }
    });

    this.menuService.onItemClick().subscribe(menuItem => {
      if ('Log in' === menuItem.item.title) {
        this.router.navigate(['/auth/login']);
      }
      if ('Log out' === menuItem.item.title) {
        this.authService.logout();
      }
    });

    this.currentTheme = this.themeService.currentTheme;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
