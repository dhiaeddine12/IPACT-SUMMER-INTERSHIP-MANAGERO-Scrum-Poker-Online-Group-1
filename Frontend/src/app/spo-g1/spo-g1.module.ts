import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpoG1RoutingModule } from './spo-g1-routing.module';
import { VotesComponent } from './votes/votes.component';
import { ForumComponent } from './forum/forum.component';
import { CreategameComponent } from './creategame/creategame.component';


@NgModule({
  declarations: [
    VotesComponent,
    ForumComponent,
    CreategameComponent
  ],
  imports: [
    CommonModule,
    SpoG1RoutingModule
  ]
})
export class SpoG1Module { }
