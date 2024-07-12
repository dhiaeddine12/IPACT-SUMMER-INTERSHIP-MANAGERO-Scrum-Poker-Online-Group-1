import { NgModule } from '@angular/core';
import {NbAccordionModule, NbMenuModule, NbStepperModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ScrumPokerG1Component } from '../scrum-poker-g1/scrum-poker-g1.component';
import { VotesComponent } from '../spo-g1/votes/votes.component';


import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { SpoG1Module } from '../spo-g1/spo-g1.module';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbMenuModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbStepperModule,
    NbAccordionModule,
  ],
  declarations: [
    PagesComponent,
    ScrumPokerG1Component

  ],
})
export class PagesModule {
}
