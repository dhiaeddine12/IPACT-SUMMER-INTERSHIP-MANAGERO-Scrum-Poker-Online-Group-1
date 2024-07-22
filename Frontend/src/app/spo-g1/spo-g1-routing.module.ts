import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VotesComponent } from './votes/votes.component';


import { ProjectsComponent } from './projects/projects.component';
import { UserstoriesComponent } from './userstories/userstories.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { IssuesComponent } from './issues/issues.component';
import { CreategameComponent } from './creategame/creategame.component';
import { ForumComponent } from './forum/forum.component';
const routes: Routes = [
  { path: 'project', component: ProjectsComponent },
  { path: 'user', component: UserstoriesComponent },
  { path: 'addp', component: AddprojectComponent },
  {path: 'issues/:id', component: IssuesComponent},
<<<<<<< Updated upstream
  { path: 'votes', component: VotesComponent }
=======
  {path: 'creategame', component: CreategameComponent},
  {path: 'forum', component: ForumComponent}
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SpoG1RoutingModule { }
