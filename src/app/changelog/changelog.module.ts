import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbAccordionModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { ChangelogRoutingModule } from './changelog-routing.module';
import { ChangelogComponent } from './changelog/changelog.component';

@NgModule({
  declarations: [ChangelogComponent],
  imports: [
    ThemeModule,
    ChangelogRoutingModule,
    CommonModule,
    NbAccordionModule,
    NbCardModule,
  ],
})
export class ChangelogModule { }
