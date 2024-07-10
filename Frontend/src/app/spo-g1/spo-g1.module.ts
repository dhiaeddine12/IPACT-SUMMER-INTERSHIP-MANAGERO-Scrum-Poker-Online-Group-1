import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpoG1RoutingModule } from './spo-g1-routing.module';
import { VotesComponent } from './votes/votes.component';
import { ForumComponent } from './forum/forum.component';
import { CreategameComponent } from './creategame/creategame.component';
import { SessionPrepComponent } from './session-prep/session-prep.component';
import { ChronometreComponent } from './chronometre/chronometre.component';


@NgModule({
  declarations: [
    VotesComponent,
    ForumComponent,
    CreategameComponent,
    SessionPrepComponent,
    ChronometreComponent,
  ],
  imports: [
    CommonModule,
    SpoG1RoutingModule,
  ],
})
export class SpoG1Module { }
