import { ThemeModule } from './../@theme/theme.module';
import { ChangelogRoutingModule } from './changelog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog/changelog.component';
import { NbAccordionModule, NbCardModule } from '@nebular/theme';


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
