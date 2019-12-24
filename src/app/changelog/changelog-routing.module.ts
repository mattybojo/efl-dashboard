import { ChangelogComponent } from './changelog/changelog.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: '',
  component: ChangelogComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ChangelogRoutingModule {}
