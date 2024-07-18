import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { UserstoriesComponent } from './userstories/userstories.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { IssuesComponent } from './issues/issues.component';


const routes: Routes = [
  { path: 'project', component: ProjectsComponent },
  { path: 'user', component: UserstoriesComponent },
  { path: 'addp', component: AddprojectComponent },
  {path: 'issues/:id', component: IssuesComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpoG1RoutingModule { }
