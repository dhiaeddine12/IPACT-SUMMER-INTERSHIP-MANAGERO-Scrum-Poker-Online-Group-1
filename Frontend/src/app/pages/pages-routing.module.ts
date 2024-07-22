import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ScrumPokerG1Component } from '../scrum-poker-g1/scrum-poker-g1.component';
<<<<<<< Updated upstream
import { VotesComponent } from '../spo-g1/votes/votes.component';
import { ForumComponent } from '../spo-g1/forum/forum.component';
import { CreategameComponent } from '../spo-g1/creategame/creategame.component';
import {SessionPrepComponent} from '../spo-g1/session-prep/session-prep.component';
import {ChronometreComponent} from '../spo-g1/chronometre/chronometre.component';
import {FibunaciCardsComponent} from '../spo-g1/fibunaci-cards/fibunaci-cards.component';
import {PokerPlanningComponent} from "../spo-g1/poker-planning/poker-planning.component";
=======
import {SessionPrepComponent} from '../spo-g1/session-prep/session-prep.component';

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    { path: 'poker-planning/votes', component: VotesComponent },
=======
    {
      path: 'poker-planning/preparation/:projectId',
      component: SessionPrepComponent,
    },
>>>>>>> Stashed changes
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
      redirectTo: 'poker-planning/votes',
      pathMatch: 'full',
    },
    {
      path: 'poker-planning',
      component: ScrumPokerG1Component,
    },
    {
      path: 'poker-planning/preparation',
      component: SessionPrepComponent,
    },
    {
      path: 'poker-planning/preparation/chrono',
      component: ChronometreComponent,
    },
    {
      path: 'poker-planning/fibunaci',
      component: FibunaciCardsComponent,
    },
    {
      path: 'ws',
      component: PokerPlanningComponent,
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
