import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbSecurityModule } from '@nebular/security';
import {
  NbActionsModule, NbButtonModule, NbContextMenuModule, NbIconModule, NbLayoutModule,
  NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbThemeModule, NbUserModule,
} from '@nebular/theme';

import { FooterComponent, HeaderComponent } from './components';
import { OneColumnLayoutComponent } from './layouts';
import { CapitalizePipe, NumberWithCommasPipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { DARK_THEME } from './styles/theme.dark';
import { DEFAULT_THEME } from './styles/theme.default';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  FontAwesomeModule,
  RouterModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  OneColumnLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
        ).providers,
      ],
    };
  }
}
