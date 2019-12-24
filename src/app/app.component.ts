/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages/pages-menu';
import { EFL_MENU_ITEMS, EFL_ADMIN_MENU_ITEMS } from './app-menu';
import { AuthService } from './shared/services/auth.service';
import { NbMenuItem, NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  styleUrls: ['./app.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class AppComponent implements OnInit {

  menu: NbMenuItem[];

  constructor(private authService: AuthService, private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('solid', {packClass: 'fas', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('regular', {packClass: 'far', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('light', {packClass: 'fal', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('duotone', {packClass: 'fad', iconClassPrefix: 'fa'});
    this.iconLibraries.registerFontPack('brands', {packClass: 'fab', iconClassPrefix: 'fa'});
  }

  ngOnInit(): void {
    this.authService.decryptUserData();
    this.menu = EFL_MENU_ITEMS;
    this.authService.getUserDataObservable().subscribe(user => {
      let temp: NbMenuItem[] = new Array<NbMenuItem>();
      if (user) {
        if (user.id === 'RAWeDzKz6ABgEnWsONnI') {
          this.menu = temp.concat(EFL_MENU_ITEMS, EFL_ADMIN_MENU_ITEMS, MENU_ITEMS);
        } else if (user.isAdmin) {
          this.menu = temp.concat(EFL_MENU_ITEMS, EFL_ADMIN_MENU_ITEMS);
        }
      } else {
        this.menu = EFL_MENU_ITEMS;
      }
    });
  }
}
