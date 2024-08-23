import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { UserstoriesComponent } from './userstories/userstories.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { IssuesComponent } from './issues/issues.component';
import { CreategameComponent } from './creategame/creategame.component';
import { ForumComponent } from './forum/forum.component';
import { ArchivedProjectsComponent } from './archived-projects/archived-projects.component';
import { IssueStatusChartComponent } from './issue-status-chart/issue-status-chart.component';
import { AddsessionComponent } from './addsession/addsession.component';
import { KpiDashboardComponentComponent } from './kpi-dashboard-component/kpi-dashboard-component.component';
const routes: Routes = [
  { path: 'project', component: ProjectsComponent },
  { path: 'user', component: UserstoriesComponent },
  { path: 'addp', component: AddprojectComponent },
  {path: 'adds', component:AddsessionComponent},
  {path: 'issues/:id', component: IssuesComponent},
  {path: 'creategame', component: CreategameComponent},
  {path: 'forum', component: ForumComponent},
  { path: 'archived-projects', component: ArchivedProjectsComponent },
{path : 'issue-status-chart', component: IssueStatusChartComponent},
{path : 'kpi-dashboard', component: KpiDashboardComponentComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpoG1RoutingModule { }