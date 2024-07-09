import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotesComponent } from './votes/votes.component';

const routes: Routes = [ { path: 'votes', component: VotesComponent } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpoG1RoutingModule { }
