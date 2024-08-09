import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ForumComponent } from '../spo-g1/forum/forum.component';
import { CreategameComponent } from '../spo-g1/creategame/creategame.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ScrumPokerG1Component } from '../scrum-poker-g1/scrum-poker-g1.component';
import {SessionPrepComponent} from '../spo-g1/session-prep/session-prep.component';
import {WebSocketComponent} from '../spo-g1/web-socket/web-socket.component';
import {FibunaciCardsComponent} from '../spo-g1/fibunaci-cards/fibunaci-cards.component';
import {RoomManagementComponent} from '../spo-g1/room-management/room-management.component';
import {ScrumMasterCardsComponent} from '../spo-g1/scrum-master-cards/scrum-master-cards.component';
import {VotesComponent} from '../spo-g1/votes/votes.component';
import {KpiDashboardComponentComponent} from '../spo-g1/kpi-dashboard-component/kpi-dashboard-component.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'poker-planning',
      component: ScrumPokerG1Component,
    },
    {
      path: 'ws',
      component: WebSocketComponent ,
    },
    { path: 'issue-management', component: RoomManagementComponent },

    {
      path: 'poker-planning/preparation/:projectId',
      component: SessionPrepComponent,
    },
    {
      path: 'KPI',
      component: KpiDashboardComponentComponent,
    },
    {
      path: 'fibunaci',
      component: FibunaciCardsComponent,
    },
    { path: 'vote/:issueTitle',
      component: VotesComponent ,
    },
      { path: 'scrum_master/:token', component:ScrumMasterCardsComponent },
      { path: 'fibunaci/:token', component: FibunaciCardsComponent },
    { path: 'room/:token', component: FibunaciCardsComponent },
    { path: 'poker-planning/forum', component: ForumComponent },
    { path: 'poker-planning/creategame', component: CreategameComponent },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
    path: 'spo-g1',
    loadChildren: () => import('../spo-g1/spo-g1.module')
      .then(m => m.SpoG1Module),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
